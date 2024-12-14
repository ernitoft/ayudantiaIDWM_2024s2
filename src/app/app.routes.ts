import { Routes } from '@angular/router';
import { authGuardGuard } from './users/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/users/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../app/users/pages/users-home/users-home.component').then(
        (m) => m.UsersHomeComponent
      ),
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import(
            '../app/users/pages/users-list/users-list.component'
          ).then((m) => m.UsersListComponent),
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
