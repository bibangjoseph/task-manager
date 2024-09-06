import {Component, inject} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {TaskItemComponent} from "../../../shared/components/task-item/task-item.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalTaskComponent} from "../../../shared/components/modal-task/modal-task.component";
import {MyTasksComponent} from "../../../shared/components/my-tasks/my-tasks.component";
import {ShareTasksComponent} from "../../../shared/components/share-tasks/share-tasks.component";
import {NgClass} from "@angular/common";

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
    selectedTab = 1;

    addTask() {
        this.modal.open(ModalTaskComponent, {size: 'lg'});
    }

    changeTab(tab: number) {
        this.selectedTab = tab;
    }
}
