import {Component, computed, inject} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {TaskService} from "../../../core/services/task.service";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        NavbarComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    taskService = inject(TaskService);
    lowPriorityTasks = computed(() => this.taskService.lowPriorityTasks());  // Utilisation des signaux
    mediumPriorityTasks = computed(() => this.taskService.mediumPriorityTasks());
    highPriorityTasks = computed(() => this.taskService.highPriorityTasks());

    constructor() {
        this.taskService.getTasksByPrioritySignal();
    }
}
