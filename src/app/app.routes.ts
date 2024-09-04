import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./views/auth/register/register.component').then(m => m.RegisterComponent)
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
