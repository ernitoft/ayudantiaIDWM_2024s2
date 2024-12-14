import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth-service.service';
import { LocalStorageServiceService } from '../../services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
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


  async login (){
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    try{
      const response = await this.authService.login(this.form.value);


      if (response.error == false){
        if (response.data.token){
          this.localStorageService.setVariable('token', response.data.token);
          this.localStorageService.setVariable('user', response.data.user);
          console.log('Usuario logueado:', this.localStorageService.getVariable('user'));

          this.router.navigate(['users/list']);
        }
      } else {
        console.log('Error en login:', response.message);
        this.error = true;
        this.errorMessage.push(response.message);
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage.push(error);

    }
  }

}
