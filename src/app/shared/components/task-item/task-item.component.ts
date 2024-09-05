import {Component, inject, Input} from '@angular/core';
import {TaskModel} from "../../../core/models/task";
import {ModalTaskComponent} from "../modal-task/modal-task.component";
import {TaskService} from "../../../core/services/task.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../core/services/toast.service";

declare var bootstrap: any

@Component({
    selector: 'app-task-item',
    standalone: true,
    imports: [
        ModalTaskComponent
    ],
    templateUrl: './task-item.component.html',
    styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
    modal = inject(NgbModal);
    taskService = inject(TaskService);
    toast = inject(ToastService);
    loadingSignal = this.taskService.loadingSignal;

    @Input({required: true}) task!: TaskModel;

    editTask(task: TaskModel) {
        const modal = this.modal.open(ModalTaskComponent, {backdrop: 'static', size: 'lg'});
        modal.componentInstance.task = task;
        modal.componentInstance.edit = true;
    }

    deleteTask(task: TaskModel) {
        this.loadingSignal.set(true);
        this.taskService.deleteTask(task.id!).then((data) => {
            if (data === true) {
                this.toast.showSuccess('Tâche supprimée avec succès', 'Succès');
            } else if (data === false) {
                this.toast.showError('Erreur lors de la suppression de la tâche', 'Erreur');
            } else if (data === 401) {
                this.toast.showError('Vous n\'êtes pas autorisé à supprimer cette tâche', 'Erreur');
            }
        })
    }
}
