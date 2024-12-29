import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  //Verificar si hay algun token para agregarlo a los headers
  const token = localStorage.getItem('token');
  console.log('Token en interceptor:', token);

  let modifiedRequest = req;
  if (token) {
    modifiedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}`),
    });
  }

  return next(modifiedRequest).pipe(
    tap((event) => {
      console.log('Event:', event);

      if (event instanceof HttpResponse) {
        //Si existe un token, lo guardo en el local storage
        const newToken = event.body.data.token;
        console.log('Nuevo token:', newToken);
        if (newToken) {
          localStorage.setItem('token', newToken);
          if (event.body.data.user) {
            localStorage.setItem('user', JSON.stringify(event.body.data.user));
          }
        }
      }
    })
  );
};
