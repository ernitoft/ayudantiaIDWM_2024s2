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

  tickets : any[] = []
  TicketsService = inject(TicketsService);

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(){
    this.TicketsService.getTickets().subscribe((data)=> {
      console.log('Data:', data);

      this.tickets = data.tickets;

      console.log('Tickets:', this.tickets);
    })
  }

  addTicket(){
    const newTicket = {
      id: String(this.tickets.length + 1),
      title: 'Ticket ' + String(this.tickets.length + 1),
      description: 'Description ' + String(this.tickets.length + 1)
    }

    console.log('New Ticket:', newTicket);

    this.TicketsService.createTicket(newTicket).subscribe((data)=>{
      this.loadTickets();

      console.log('Lista actualizada :D');
    })

  }


}
