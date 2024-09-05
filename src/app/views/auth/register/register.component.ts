import {Component, inject} from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    signupForm!: FormGroup;
    fb = inject(FormBuilder);
    authServ = inject(AuthService);
    toastServ = inject(ToastService);
    isSubmit = false;

    constructor() {
        this.signupForm = this.fb.group({
            pseudo: [''],
            email: [''],
            password: ['']
        });
    }

    async submit() {
        const formValue = this.signupForm.value;
        this.isSubmit = true;
        this.authServ.registerUser(
            formValue.email,
            formValue.password,
            {pseudo: formValue.pseudo}  // Ajouter d'autres données utilisateur ici
        ).then(() => {
            this.toastServ.showSuccess('Compte crée avec succès', 'Succès');
            this.signupForm.reset();
            this.isSubmit = false
        }).catch((error) => {
            this.toastServ.showError("Une erreur s'est produite lors de la création", 'Erreur');
            this.isSubmit = false
        });
    }
}
