import { Component, inject, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ticket-tickets-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [TicketsService],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent implements OnInit{
  tickets: any[] = [];
  private ticketsService = inject(TicketsService);

  ngOnInit(): void {
    this.loadTickets();
  }

  addTicket(){
    const newTicket = {
      id: String(this.tickets.length + 1),
      title: 'Ticket ' + (this.tickets.length + 1),
      description: 'Description of ticket ' + (this.tickets.length + 1)
    }

    console.log('Ticket añadido: ', newTicket);

    this.ticketsService.createTicket(newTicket).subscribe(()=>{
      //Cargar los tickets, la lista actualizada
      this.loadTickets();
    })
  }

  loadTickets(){
    this.ticketsService.getTickets().subscribe((data) => {
      console.log('Data del LoadTickets: ', data);
      this.tickets = data.tickets;

      console.log('Tickets en Lista: ', this.tickets);
    })
  }



}
