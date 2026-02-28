import { Component, OnInit } from '@angular/core';
import { PersonelService } from '../services/personel.service';

@Component({
  selector: 'app-personel-listesi',
  templateUrl: './personel-listesi.component.html'
})
export class PersonelListesiComponent implements OnInit {
  personeller: any[] = [];

  // Servisi C#'taki Dependency Injection mantığıyla constructor'da alıyoruz
  constructor(private personelService: PersonelService) { }

  // Component ekrana yüklendiğinde çalışacak ilk metod
  ngOnInit(): void {
    this.personelService.getPersoneller().subscribe(data => {
      this.personeller = data; // API'den gelen veriyi değişkene atıyoruz
    });
  }
}
