import {inject, Injectable, signal} from '@angular/core';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from '@angular/fire/firestore';
import {TaskModel} from "../models/task";
import {Auth, User} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    // Création d'un signal pour stocker les tâches
    tasksSignal = signal<TaskModel[]>([]);
    sharedTasksSignal = signal<TaskModel[]>([]);
    loadingSignal = signal<boolean>(false);
    loadingSharedSignal = signal<boolean>(false);
    user = signal<User | null>(null);


    auth = inject(Auth);
    private lowPriorityTasksSignal = signal<number>(0);   // Signal pour les tâches de faible priorité
    private mediumPriorityTasksSignal = signal<number>(0); // Signal pour les tâches de priorité moyenne
    private highPriorityTasksSignal = signal<number>(0);  // Signal pour les tâches de haute priorité
    private firestore = inject(Firestore);
    private tasksCollection = collection(this.firestore, 'tasks') as CollectionReference;

    constructor() {
        this.auth.onAuthStateChanged(user => this.user.set(user));
    }

    // Getters pour chaque signal
    get lowPriorityTasks() {
        return this.lowPriorityTasksSignal;
    }

    get mediumPriorityTasks() {
        return this.mediumPriorityTasksSignal;
    }

    get highPriorityTasks() {
        return this.highPriorityTasksSignal;
    }

    /*
    *  Fonction pour ajouter une tâche
    * */
    async addTask(taskData: any): Promise<void> {
        try {
            await addDoc(this.tasksCollection, taskData);
        } catch (error) {
        }
    }

    /*
    * Méthode pour récupérer les tâches d'un utilisateur en temps réel
    * */
    getTasksByUser(userId: string): void {
        this.loadingSignal.set(true);
        const userTasksQuery = query(
            this.tasksCollection,
            where('ownerId', '==', userId),
            orderBy('createdAt', 'desc')  // Trier par date de création, décroissant (les plus récentes en premier)
        );

        onSnapshot(userTasksQuery, (querySnapshot) => {
            const tasks: TaskModel[] = [];
            querySnapshot.forEach((doc) => {
                tasks.push({id: doc.id, ...doc.data()} as TaskModel);
            });
            // Mise à jour du signal avec les nouvelles tâches
            this.tasksSignal.set(tasks);
            this.loadingSignal.set(false);
        }, (error) => {
            console.error('Error fetching tasks:', error);
        });
    }

    async deleteTask(taskId: string): Promise<any> {
        const hasPerm = await this.hasPermission(taskId);
        if (hasPerm) {
            try {
                const taskRef = doc(this.firestore, `tasks/${taskId}`);
                const taskSnapshot = await getDoc(taskRef);

                if (taskSnapshot.exists()) {
                    await deleteDoc(taskRef);
                    return true; // Suppression réussie
                } else {
                    return false; // Tâche non trouvée
                }
            } catch (error) {
                return false; // Erreur lors de la suppression
            }
        } else {
            return 401; // Permissions non accordées
        }
    }

    async updateTask(taskId: string, updatedData: any): Promise<any> {
        const hasPerm = await this.hasPermission(taskId);
        if (hasPerm) {
            try {
                const taskRef = doc(this.firestore, `tasks/${taskId}`);
                await updateDoc(taskRef, updatedData);
                return true; // Mise à jour réussie
            } catch (error) {
                return false; // Erreur lors de la mise à jour
            }
        } else {
            return 403; // Permissions non accordées
        }
    }

    async hasPermission(taskId: string): Promise<boolean> {
        const user = this.user();
        if (user) {
            const taskRef = doc(this.firestore, `tasks/${taskId}`);
            const taskSnapshot = await getDoc(taskRef);
            if (taskSnapshot.exists()) {
                const task = taskSnapshot.data() as any; // Assure-toi que la structure de `task` correspond à ton modèle
                if (task.ownerId === user.uid || task.collaborators.includes(user.uid)) {
                    return true; // L'utilisateur a les permissions nécessaires
                }
                return false; // L'utilisateur n'a pas les permissions nécessaires
            } else {
                return false; // La tâche n'existe pas
            }
        } else {
            return false; // Aucun utilisateur connecté
        }
    }

    getTasksByPrioritySignal() {
        const user = this.auth.currentUser;
        if (!user) {
            console.error('No user is currently logged in');
            this.lowPriorityTasksSignal.set(0);
            this.mediumPriorityTasksSignal.set(0);
            this.highPriorityTasksSignal.set(0);
            return;
        }

        // Requête pour les tâches de faible priorité
        const lowPriorityQuery = query(
            collection(this.firestore, 'tasks'),
            where('ownerId', '==', user.uid),
            where('priority', '==', 'low')
        );

        getDocs(lowPriorityQuery).then(querySnapshot => {
            this.lowPriorityTasksSignal.set(querySnapshot.size);
        }).catch(error => {
            console.error('Error fetching low priority tasks:', error);
            this.lowPriorityTasksSignal.set(0);
        });

        // Requête pour les tâches de priorité moyenne
        const mediumPriorityQuery = query(
            collection(this.firestore, 'tasks'),
            where('ownerId', '==', user.uid),
            where('priority', '==', 'medium')
        );

        getDocs(mediumPriorityQuery).then(querySnapshot => {
            this.mediumPriorityTasksSignal.set(querySnapshot.size);
        }).catch(error => {
            console.error('Error fetching medium priority tasks:', error);
            this.mediumPriorityTasksSignal.set(0);
        });

        // Requête pour les tâches de haute priorité
        const highPriorityQuery = query(
            collection(this.firestore, 'tasks'),
            where('ownerId', '==', user.uid),
            where('priority', '==', 'high')
        );

        getDocs(highPriorityQuery).then(querySnapshot => {
            this.highPriorityTasksSignal.set(querySnapshot.size);
        }).catch(error => {
            console.error('Error fetching high priority tasks:', error);
            this.highPriorityTasksSignal.set(0);
        });
    }

    async addUserToTask(taskId: string, user: any, permissions: { canEdit: boolean; canDelete: boolean }) {
        const taskRef = doc(this.firestore, `tasks/${taskId}`);
        const taskSnapshot = await getDoc(taskRef);

        if (taskSnapshot.exists()) {
            const task = taskSnapshot.data() as TaskModel;
            const collaborator = task.collaborators.find(c => c.uid === user.id);

            if (!collaborator) {
                task.collaborators.push({
                    uid: user.id,
                    permissions
                });
            } else {
                // Mettre à jour les permissions si l'utilisateur est déjà un collaborateur
                collaborator.permissions = permissions;
            }

            await updateDoc(taskRef, {collaborators: task.collaborators});
            console.log('Collaborateur ajouté avec succès');
        } else {
            console.error('La tâche n\'existe pas');
        }
    }

    loadSharedTasks() {
        const user = this.auth.currentUser;
        if (user) {
            this.loadingSharedSignal.set(true);
            const tasksRef = collection(this.firestore, 'tasks');
            const q = query(tasksRef);

            onSnapshot(q, (querySnapshot) => {
                const tasks: TaskModel[] = [];
                querySnapshot.forEach((doc) => {
                    const task = doc.data() as TaskModel;
                    // Vérifie si le user UID est dans les collaborateurs avec des permissions
                    const isCollaborator = task.collaborators.some(collab => collab.uid === user.uid);
                    if (isCollaborator) {
                        tasks.push(task);
                    }
                });
                this.sharedTasksSignal.set(tasks);
                this.loadingSharedSignal.set(false);
            });
        } else {
            this.loadingSharedSignal.set(false);
        }
    }

}
