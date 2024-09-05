import {Component} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";

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

}
