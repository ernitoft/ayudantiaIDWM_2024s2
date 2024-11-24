import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Button2Component } from '../../components/button2/button2.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'ebook-page-home',
  standalone: true,
  imports: [ButtonComponent, Button2Component],
  templateUrl: './ebooks-home.component.html',
  styleUrl: './ebooks-home.component.css'
})
export class EbooksHomeComponent {

}
