import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'images-imgdrop',
  standalone: true,
  imports: [NgxDropzoneModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [UploadService],
  templateUrl: './img-drop.component.html',
  styleUrl: './img-drop.component.css',
})
export class ImgDropComponent {
  files: File[] = [];

  constructor(private UploadService: UploadService) {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    if (this.files.length === 0) {
      console.log('No hay archivos para subir');
      return false;
    }

    const fileForm = new FormData();
    const fileData = this.files[0];

    fileForm.append('file', fileData);
    fileForm.append('upload_preset', 'cloudinary-ayudantiaIDWM');
    fileForm.append('cloud_name', 'dlhobpxi0');

    this.UploadService.uploadService(fileForm).subscribe({
      next: (response) => {
        console.log('Respuesta de la subida:', response);
        alert('Imagen subida correctamente');
      },
      error: (error) => {
        console.log('Error en la subida:', error);
      },
    });

    return true;
  }
}
