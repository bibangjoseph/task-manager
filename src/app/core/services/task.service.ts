import {inject, Injectable, signal} from '@angular/core';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    Firestore,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where
} from '@angular/fire/firestore';
import {TaskModel} from "../models/task";
import {Auth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    // Création d'un signal pour stocker les tâches
    tasksSignal = signal<TaskModel[]>([]);
    loadingSignal = signal<boolean>(false);
    selectedTaskSignal = signal<TaskModel | null>(null);
    auth = inject(Auth);
    private firestore = inject(Firestore);
    private tasksCollection = collection(this.firestore, 'tasks') as CollectionReference;

    constructor() {
    }


    async addTask(taskData: any): Promise<void> {
        try {
            await addDoc(this.tasksCollection, taskData);
            console.log('Task added successfully');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }


    async updateTask(id: string, updatedData: Partial<TaskModel>): Promise<void> {
        const taskDoc = doc(this.firestore, `tasks/${id}`);
        try {
            await updateDoc(taskDoc, updatedData);
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    // Méthode pour récupérer les tâches d'un utilisateur en temps réel
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

    async deleteTask(taskId: string) {
        try {
            const user = this.auth.currentUser;
            if (!user) {
                throw new Error('No user is currently logged in');
            }

            const taskRef = doc(this.firestore, `tasks/${taskId}`);

            // Fetch the task first to check if the ownerId matches
            const taskSnapshot = await getDoc(taskRef);

            if (!taskSnapshot.exists()) {
                throw new Error('Task not found');
            }

            const task = taskSnapshot.data() as TaskModel;
            if (task.ownerId !== user.uid) {
                return 401; // Non autorisé
            }

            // User is the owner, proceed to delete
            await deleteDoc(taskRef);
            return true;

        } catch (error: any) {
            // Log the error and return the message
            console.error('Error deleting task:', error.message);
            return error.message;
        }
    }
}
