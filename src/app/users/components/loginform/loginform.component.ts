import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { LocalStorageServiceService } from '../../services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthServiceService, LocalStorageServiceService],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
})
export class LoginformComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];

  private authService = inject(AuthServiceService);
  private localStorageService = inject(LocalStorageServiceService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }


  login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        if (response.error == false) {
          if (response.data.token) {
            console.log('Usuario logueado:', this.localStorageService.getVariable('user'));

            this.router.navigate(['users/list']);
          }
        } else {
          console.log('Error en login:', response.message);
          this.error = true;
          this.errorMessage.push(response.message);
        }
      },
      error: (error) => {
        this.error = true;
        this.errorMessage.push(error);
      }
    });
  }

}
