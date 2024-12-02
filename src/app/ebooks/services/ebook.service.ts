import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAPIGetAll } from '../interfaces/ResponseAPI_GetAll';
import { firstValueFrom } from 'rxjs';
import { Ebook } from '../interfaces/Ebook';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  private baseUrl: string = 'http://localhost:5000/api';
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getAllEbooks(genre: string): Promise<ResponseAPIGetAll[]> {
    try {
      const queryParams = new HttpParams().set('genre', genre).toString();

      const response = await firstValueFrom(
        this.http.get<ResponseAPIGetAll[]>(
          `${this.baseUrl}/ebook?${queryParams}`
        )
      );
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en getAllEbooks', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async createEbook(ebook: Ebook): Promise<ResponseAPIGetAll> {
    try {

      console.log('Ebook en service:', ebook);


      const response = await firstValueFrom(
        this.http.post<ResponseAPIGetAll>(`${this.baseUrl}/ebook`, ebook)
      );
      console.log('Ebook en service, Response:', response);
      return Promise.resolve(response);
    } catch (error) {

      console.error('Error en createEbook', error);

      if (error instanceof HttpErrorResponse) {
        const errorMessage =
          typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }

      return Promise.reject(error);
    }
  }

  getErrors(): string[] {
    return this.errors;
  }

}
