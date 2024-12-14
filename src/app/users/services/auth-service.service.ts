import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPI } from '../interfaces/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseURL: string = 'http://127.0.0.1:8000/api/';
  public errors: string[] = [];
  private http = inject(HttpClient);


  async login(form: any): Promise<ResponseAPI>{
    try{
      const response = await firstValueFrom(this.http.post<ResponseAPI>(this.baseURL+'login', form));
      return Promise.resolve(response);
    }
    catch(error){
      console.log('Error en login', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }



}
