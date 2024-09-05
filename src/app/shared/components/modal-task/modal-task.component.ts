import {Component, inject, Input} from '@angular/core';
import {TaskService} from "../../../core/services/task.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TaskModel} from "../../../core/models/task";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../core/services/toast.service";
import {Auth} from "@angular/fire/auth";

@Component({
    selector: 'app-modal-task',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './modal-task.component.html',
    styleUrl: './modal-task.component.scss'
})
export class ModalTaskComponent {
    taskService = inject(TaskService);
    fb = inject(FormBuilder);
    modal = inject(NgbActiveModal)
    toast = inject(ToastService);
    auth = inject(Auth);

    @Input() task!: TaskModel;
    @Input() edit: boolean = false;

    taskForm!: FormGroup;
    isSubmit = false;
    user: any;

    ngOnInit() {

        this.taskForm = this.fb.group({
            title: [''],
            description: [''],
            dueDate: [''],
            priority: ['low'],
            completed: [false],
            collaborators: [[]],
            ownerId: [''], // Assurez-vous que l'UID du créateur est défini correctement
            createdAt: ['']
        });


        this.auth.onAuthStateChanged((user) => {
            this.user = user;
            if (user) {
                this.taskForm.patchValue({ownerId: user.uid, createdAt: new Date()});
            }
        });


        if (this.edit) {
            this.taskForm = this.fb.group({
                title: [this.task.title],
                description: [this.task.description],
                dueDate: [this.task.dueDate],
                priority: [this.task.priority],
                completed: [this.task.completed]
            });
        }
    }


    close() {
        this.modal.close();
    }

    submit() {
        this.isSubmit = true;
        const taskData = this.taskForm.value;
        if (this.edit) {
            this.taskService.updateTask(this.task.id!, taskData)
                .then(() => {
                    this.toast.showSuccess('Tâche mise à jour avec succès', 'Succès');
                    this.modal.dismiss(2);
                })
        } else {
            this.taskService.addTask(taskData)
                .then(() => {
                    this.toast.showSuccess('Tâche ajoutée avec succès', 'Succès');
                    this.modal.dismiss(2);
                })
        }
    }
}
