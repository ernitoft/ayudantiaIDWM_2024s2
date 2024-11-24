import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./ebooks/pages/ebooks-home/ebooks-home.component').then(m => m.EbooksHomeComponent)
  }
];
