import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocalStorageServiceService } from '../../../users/services/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageServiceService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentPage: string;
  private LSService = inject(LocalStorageServiceService);
  isLogged: boolean = this.LSService.getVariable('token') ? true : false;

  constructor(private router: Router) {
    this.currentPage = 'Home';
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  logout() {
    this.LSService.removeValue('token');
    this.LSService.removeValue('user');
    this.router.navigate(['/']);
  }
}
