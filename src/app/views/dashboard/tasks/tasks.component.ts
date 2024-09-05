import {Component} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [
        NavbarComponent
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss'
})
export class TasksComponent {

}
