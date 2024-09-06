import {Component, inject} from '@angular/core';
import {TaskItemComponent} from "../task-item/task-item.component";
import {TaskService} from "../../../core/services/task.service";
import {Auth} from "@angular/fire/auth";

@Component({
    selector: 'app-my-tasks',
    standalone: true,
    imports: [
        TaskItemComponent
    ],
    templateUrl: './my-tasks.component.html',
    styleUrl: './my-tasks.component.scss'
})
export class MyTasksComponent {
    taskService = inject(TaskService);
    auth = inject(Auth);


    tasksSignal = this.taskService.tasksSignal;
    loadingSignal = this.taskService.loadingSignal;


    ngOnInit() {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.taskService.getTasksByUser(user.uid);
            }
        });
    }
}
