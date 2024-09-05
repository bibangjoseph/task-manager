import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthService} from "../../../core/services/auth.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    router = inject(Router)
    auth = inject(AuthService)
    toast = inject(ToastService)

    isLinkActive(urls: string[]): boolean {
        return urls.some(url => this.router.isActive(url, true));
    }

    logout() {
        this.auth.logoutUser().then(() => {
            this.router.navigate(['/login']);  // Rediriger vers la page de connexion après la déconnexion
            this.toast.showSuccess('Vous avez été déconnecté avec succès', 'Déconnexion');
        });
    }

}
