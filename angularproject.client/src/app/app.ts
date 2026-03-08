import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service'; // Arama servisini ekledik

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false // Senin orijinal yapın
})
export class App { // İsmi orijinal halindeki gibi 'App' bıraktık

  constructor(
    public authService: AuthService,
    private searchService: SearchService
  ) { }

  // Navbar'daki arama kutusu için çalışan metot
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchService.changeSearch(target.value);
  }
}
