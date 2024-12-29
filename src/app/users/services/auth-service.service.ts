import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPI } from '../interfaces/interfaces';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseURL: string = 'http://127.0.0.1:8000/api/';
  public errors: string[] = [];
  private http = inject(HttpClient);


  login(form: any): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.baseURL + 'login', form).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en login', error);
        this.errors.push(error.message);
        return throwError(() => new Error('Error en login'));
      })
    );
  }



}
