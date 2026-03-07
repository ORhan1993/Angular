import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App {
  // HTML dosyasında (template) kullanabilmek için 'public' olarak tanımlıyoruz
  constructor(public authService: AuthService) { }
}
