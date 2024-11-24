import { Component, inject } from '@angular/core';
import { EbookService } from '../../services/ebook.service';
import { Ebook } from '../../interfaces/Ebook';

@Component({
  selector: 'ebook-button2',
  standalone: true,
  imports: [],
  providers: [EbookService],
  templateUrl: './button2.component.html',
  styleUrl: './button2.component.css'
})
export class Button2Component {

  private ebookService: EbookService = inject(EbookService);

  constructor() {}


  crearEbook() {
    const ebook: Ebook = {
      Title: 'Ayudantia hola ',
      Author: 'Yo',
      Genre: 'Fiction',
      Format: "Ebook",
      Price: 9
    }

    this.ebookService.createEbook(ebook).then((ebook) => {
      console.log('Ebook creado: ', ebook);
    }).catch((error) => {
      console.log(error);
    });

  }

}
