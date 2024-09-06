import {Component, inject} from '@angular/core';
import {TaskService} from "../../../core/services/task.service";
import {Auth} from "@angular/fire/auth";
import {TaskItemComponent} from "../task-item/task-item.component";

@Component({
    selector: 'app-share-tasks',
    standalone: true,
    imports: [
        TaskItemComponent
    ],
    templateUrl: './share-tasks.component.html',
    styleUrl: './share-tasks.component.scss'
})
export class ShareTasksComponent {
    taskService = inject(TaskService);
    auth = inject(Auth);

    sharedTasksSignal = this.taskService.sharedTasksSignal;
    loadingSharedSignal = this.taskService.loadingSharedSignal;

    constructor() {
        this.taskService.loadSharedTasks();
    }
}
