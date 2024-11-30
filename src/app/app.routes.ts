import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./ebooks/pages/ebooks-home/ebooks-home.component').then(
        (m) => m.EbooksHomeComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./ebooks/pages/users/users.component').then(
        (m) => m.UsersComponent
      ),
  }
  ,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
