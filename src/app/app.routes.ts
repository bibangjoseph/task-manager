import {Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {NoAuthGuard} from "./core/guards/no-auth.guard";

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [NoAuthGuard], // Empêcher l'accès à la page de login si l'utilisateur est déjà connecté
        loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        canActivate: [NoAuthGuard],  // Empêcher l'accès à la page de login si l'utilisateur est déjà connecté
        loadComponent: () => import('./views/auth/register/register.component').then(m => m.RegisterComponent)
    },

    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'tasks',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/dashboard/tasks/tasks.component').then(m => m.TasksComponent)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
