import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {TaskService} from "../../../core/services/task.service";
import {Auth} from "@angular/fire/auth";
import {TaskItemComponent} from "../../../shared/components/task-item/task-item.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalTaskComponent} from "../../../shared/components/modal-task/modal-task.component";

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [
        NavbarComponent,
        RouterLink,
        TaskItemComponent
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    taskService = inject(TaskService);
    auth = inject(Auth);
    modal = inject(NgbModal)

    isLoad = true;


    // Signal qui suit les tâches
    tasksSignal = this.taskService.tasksSignal;
    loadingSignal = this.taskService.loadingSignal;


    ngOnInit() {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.taskService.getTasksByUser(user.uid);
                this.isLoad = true;
            }
        });
    }


    addTask() {
        this.modal.open(ModalTaskComponent, {size: 'lg'});
    }
}
