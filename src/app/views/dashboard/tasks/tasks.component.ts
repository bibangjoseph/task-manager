import {Component, inject, signal} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {TaskItemComponent} from "../../../shared/components/task-item/task-item.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalTaskComponent} from "../../../shared/components/modal-task/modal-task.component";
import {MyTasksComponent} from "../../../shared/components/my-tasks/my-tasks.component";
import {ShareTasksComponent} from "../../../shared/components/share-tasks/share-tasks.component";
import {NgClass} from "@angular/common";
import {TaskService} from "../../../core/services/task.service";

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [
        NavbarComponent,
        RouterLink,
        TaskItemComponent,
        MyTasksComponent,
        ShareTasksComponent,
        NgClass
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    modal = inject(NgbModal)
    taskService = inject(TaskService);
    selectedTab = 1;
    user: any

    countTaskSignal = signal(0);
    countSharedTaskSignal = signal(0);

    constructor() {
        this.countTaskSignal = this.taskService.countTaskSingal;
        this.countSharedTaskSignal = this.taskService.countSharedTaskSignal;

    }

    addTask() {
        this.modal.open(ModalTaskComponent, {size: 'lg'});
    }

    changeTab(tab: number) {
        this.selectedTab = tab;
    }
}
