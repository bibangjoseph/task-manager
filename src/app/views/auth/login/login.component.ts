import {Component, inject} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {ToastService} from "../../../core/services/toast.service";


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm!: FormGroup;
    fb = inject(FormBuilder);
    authServ = inject(AuthService);
    isSubmit = false;
    router = inject(Router);
    toast = inject(ToastService);

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: [''],
            password: ['']
        });
    }

    submit() {
        this.isSubmit = true;
        const formValue = this.loginForm.value;
        this.authServ.loginUser(
            formValue.email,
            formValue.password
        ).then((userData) => {
            this.router.navigate(['/dashboard']);
            this.toast.showSuccess('Bienvenue ' + userData.pseudo + ' !', 'Bon retour!');
            // Redirection ou action après connexion réussie
        }).catch((error) => {
            console.error('Login failed:', error);
        });
    }

}
