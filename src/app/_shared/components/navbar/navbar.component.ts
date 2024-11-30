import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentPage: string;

  constructor() {
    this.currentPage = 'Home';
  }

  changePage(page: string) {
    this.currentPage = page;
  }
}
