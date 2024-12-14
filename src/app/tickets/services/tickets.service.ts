import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private http = inject(HttpClient);
  private baseURL: string = 'http://localhost:3000/tickets';

  getTickets(): Observable<{tickets: any[]}> {
    return this.http.get<{tickets: any[]}>(this.baseURL, {
      withCredentials: true, // Aqui digo que se están incluyendo las cookies de la Request
    });
  }

  createTicket(ticket : {id: string, title: string, description: string}) : Observable<{ticket: any}>{
    return this.http.post<{ticket: any}>(this.baseURL, ticket, {
      withCredentials: true, // Aqui digo que se están incluyendo las cookies de la Request
    })
  }
}
