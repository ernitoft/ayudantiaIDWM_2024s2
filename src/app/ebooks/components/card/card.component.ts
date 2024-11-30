import { Component, Input } from '@angular/core';
import { ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ebook-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() ebook: ResponseAPIGetAll

  constructor() {
    this.ebook = {
      id: 0,
      title: '',
      author: '',
      genre: '',
      format: '',
      isAvailable: false,
      price: 0,
      stock: 0
    }
  }
}
