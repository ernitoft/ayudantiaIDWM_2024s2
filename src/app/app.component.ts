import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './_shared/components/navbar/navbar.component';
import { LoginPageComponent } from './users/pages/login-page/login-page.component';

@Component({
  selector: 'app-idwm',
  standalone: true,
  imports: [LoginPageComponent, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ayudantiaFrontendIDWM_ANGULAR18';

  ngOnInit(): void {
    initFlowbite();
  }
}
