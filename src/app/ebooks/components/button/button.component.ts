import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { EbookService } from '../../services/ebook.service';
import { ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';

@Component({
  selector: 'ebook-button',
  standalone: true,
  imports: [HttpClientModule],
  providers: [EbookService],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  private ebookService: EbookService = inject(EbookService);

  private ebooks: ResponseAPIGetAll[] = [];

  constructor() {
  }

  obtenerEbooks() {
    this.ebookService.getAllEbooks('Fiction').then((ebooks) => {
      this.ebooks = ebooks;
      console.log('Ebooks: ', this.ebooks);

    }).catch((error) => {
      console.log(error);
    });
  }

}
