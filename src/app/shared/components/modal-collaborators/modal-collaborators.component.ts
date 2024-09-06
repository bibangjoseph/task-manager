import {Component, inject, Input} from '@angular/core';
import {TaskModel} from "../../../core/models/task";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../../core/services/auth.service";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
    selector: 'app-modal-collaborators',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './modal-collaborators.component.html',
    styleUrl: './modal-collaborators.component.scss'
})
export class ModalCollaboratorsComponent {
    @Input({required: true}) task!: TaskModel;

    modal = inject(NgbActiveModal)


    authService = inject(AuthService);
    modalService = inject(NgbActiveModal);
    taskService = inject(TaskService);
    toast = inject(ToastService);


    searchQuery: string = '';
    allUsers: any[] = [];
    filteredUsers: any[] = [];
    selectedTaskId: any;
    editPermission: boolean = false;
    deletePermission: boolean = false;


    ngOnInit() {
        this.loadUsers()
        this.selectedTaskId = this.task.id;
    }

    close() {
        this.modal.close();
    }

    async loadUsers() {
        this.allUsers = await this.authService.getUsers();
        this.filteredUsers = this.allUsers;
    }

    searchUsers() {
        if (this.searchQuery) {
            this.filteredUsers = this.allUsers.filter(user =>
                user.pseudo.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        } else {
            this.filteredUsers = this.allUsers;
        }
    }

    addUserToTask(user: any) {
        if (this.selectedTaskId) {
            this.taskService.addUserToTask(this.selectedTaskId, user, {
                canEdit: this.editPermission,
                canDelete: this.deletePermission
            }).then(() => {
                this.toast.showSuccess('Collaborateur ajouté avec succès', 'Succès');
                this.modalService.close();
            });
        }
    }
}
