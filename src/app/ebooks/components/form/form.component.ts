import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EbookService } from '../../services/ebook.service';
import { Ebook } from '../../interfaces/Ebook';

@Component({
  selector: 'ebook-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  ebookService = inject(EbookService);

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.forms = this.FormBuilder.group({
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      Genre: ['', [Validators.required]],
      Format: ['', [Validators.required]],
      Price: ['', [Validators.required]],
    });
  }

  async onSubmit(){
    if (this.forms.invalid) return;
    try{
      const Ebook: Ebook = {
        Title: this.forms.value.Title,
        Author: this.forms.value.Author,
        Genre: this.forms.value.Genre,
        Format: this.forms.value.Format,
        Price: this.forms.value.Price,
      }
      const response = await this.ebookService.createEbook(Ebook);

      console.log('Response:', response);

      if (response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Ebook creado:', response);
      }

      else {
        this.error = true;
        this.errorMessage = this.ebookService.getErrors();
        console.log('Error al crear ebook:', this.errorMessage);
      }
    } catch (error:any) {

      console.error('Error en onSubmit', error);
      this.error = true;
      this.errorMessage.push(error.error);

    } finally {

      console.log('Petición Finalizada');
      this.forms.reset();
    }
  }

  get titleInvalid() {
    return this.forms.get('Title')?.invalid && this.forms.get('Title')?.touched;
  }

  get authorInvalid() {
    return this.forms.get('Author')?.invalid && this.forms.get('Author')?.touched;
  }

  get genreInvalid() {
    return this.forms.get('Genre')?.invalid && this.forms.get('Genre')?.touched;
  }

  get formatInvalid() {
    return this.forms.get('Format')?.invalid && this.forms.get('Format')?.touched;
  }

  get priceInvalid() {
    return this.forms.get('Price')?.invalid && this.forms.get('Price')?.touched;
  }

}
