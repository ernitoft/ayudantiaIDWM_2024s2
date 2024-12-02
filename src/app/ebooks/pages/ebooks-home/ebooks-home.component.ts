import { Component, inject, OnInit } from '@angular/core';
import { EbookService } from '../../services/ebook.service';
import { ResponseAPIGetAll } from '../../interfaces/ResponseAPI_GetAll';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'ebook-page-home',
  standalone: true,
  imports: [HttpClientModule, CardComponent, CommonModule, FormComponent],
  providers: [EbookService],
  templateUrl: './ebooks-home.component.html',
  styleUrl: './ebooks-home.component.css'
})
export class EbooksHomeComponent implements OnInit{

  ebooksArray: ResponseAPIGetAll[] = [];
  private ebookService = inject(EbookService);

  ngOnInit(): void {
    this.obtenerEbooks();
  }

  obtenerEbooks() {
    console.log('Obteniendo ebooks...');
    this.ebookService.getAllEbooks('')
      .then((ebooks) => {

        for (let i = 0; i < ebooks.length; i++) {

          console.log('Añadiendo:', ebooks[i]);
          this.ebooksArray.push(ebooks[i]);
        }

        console.log('Ebooks obtenidos:', this.ebooksArray);
      })
      .catch((error) => {
        console.log('Error al obtener ebooks:', error);
      });

      return;
  }
}
