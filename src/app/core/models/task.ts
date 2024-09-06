export interface TaskModel {
    id?: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    completed: 'open' | 'closed';
    collaborators: {
        uid: string;
        permissions: {
            canEdit: boolean;
            canDelete: boolean;
        };
    }[];  // Liste d'UID des collaborateurs
    ownerId: string;  // UID du créateur de la tâche
    createdAt: Date; // Date de création de la tâche
}
