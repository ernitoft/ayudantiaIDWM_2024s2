import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localService = inject(LocalStorageServiceService);

  if (localService.getVariable('token')){
    const userString = localService.getVariable('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user && user.role_id == 1) {
      console.log('Usuario logueado 2:', localService.getVariable('user'));
      return true;
    }


    //TODO: Implementar la logica del rol por usuario
    //Redirigir a la página de inicio de usuario, dashboard o productos segun sea el rol


    return true;
  } else {
    router.navigate(['']);
    return false;
  }


};
