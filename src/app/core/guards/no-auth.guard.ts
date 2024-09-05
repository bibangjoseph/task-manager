import {inject, Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    private auth = inject(Auth);
    private router = inject(Router);

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    // L'utilisateur est connecté, le rediriger vers le tableau de bord
                    resolve(this.router.createUrlTree(['/dashboard']));
                } else {
                    // L'utilisateur n'est pas connecté, permettre l'accès à la route
                    resolve(true);
                }
            });
        });
    }
}
