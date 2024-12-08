import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private baseUrl: string = 'http://localhost:3000/tickets';
  private http = inject(HttpClient);


  getTickets():  Observable<{tickets : any[]}>{
    return this.http.get<{tickets: any[]}>(this.baseUrl,
      {
        withCredentials: true, // Lo que digo aquí es que se incluyen las cookies en la petición
      }
    );
  }

  createTicket(ticket: {id: string; title:string; description: string}){
    return this.http.post(this.baseUrl, ticket, {
      withCredentials: true, // Lo que digo aquí es que se incluyen las cookies en la petición
    })
  }
}
