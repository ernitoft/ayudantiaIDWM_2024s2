import { Component } from '@angular/core';
import { NavbarComponent } from '../../../_shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'users-users-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './users-home.component.html',
  styleUrl: './users-home.component.css'
})
export class UsersHomeComponent {


  // UserLogged : User

  constructor() {
    console.log('Users Home Component');
  }

  //TODO: Implementar metodo para obtener usuario logueado
}
