import { Component } from '@angular/core';
import { LoginformComponent } from '../../components/loginform/loginform.component';

@Component({
  selector: 'users-login-page',
  standalone: true,
  imports: [LoginformComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
