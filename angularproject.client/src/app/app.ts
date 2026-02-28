import { Component, OnInit } from '@angular/core';
import { Personel, PersonelService } from './services/personel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public personeller: Personel[] = [];
  public yeniPersonel: Personel = { id: 0, ad: '', soyad: '', departman: '' };

  constructor(private service: PersonelService) { }

  ngOnInit() { this.getPersoneller(); }

  getPersoneller() {
    this.service.getPersoneller().subscribe(data => this.personeller = data);
  }

  kaydet() {
    this.service.addPersonel(this.yeniPersonel).subscribe(() => {
      this.getPersoneller();
      this.yeniPersonel = { id: 0, ad: '', soyad: '', departman: '' };
    });
  }
}
