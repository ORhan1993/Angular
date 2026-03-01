import { Component, OnInit } from '@angular/core';
import { PersonelService, Personel } from './services/personel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App implements OnInit {
  // Ekranda listeleyeceğimiz dizi
  personeller: Personel[] = [];

  // Formdan gelecek verileri tutacak yeni nesne
  yeniPersonel: Personel = { id: 0, ad: '', soyad: '', departman: '' };

  // Servisi constructor üzerinden enjekte ediyoruz
  constructor(private personelService: PersonelService) { }

  // Bileşen yüklendiğinde çalışacak metot
  ngOnInit() {
    this.personelListesiniGetir();
  }

  personelListesiniGetir() {
    // Observable'ı 'subscribe' (abone ol) ile dinliyoruz
    this.personelService.getPersoneller().subscribe(data => {
      this.personeller = data;
    });
  }

  personelEkle() {
    if (!this.yeniPersonel.ad.trim() || !this.yeniPersonel.soyad.trim()) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // Id'yi çıkarıp sadece gerekli verileri gönderiyoruz (Destructuring)
    const { id, ...personelData } = this.yeniPersonel;

    this.personelService.addPersonel(personelData as any).subscribe({
      next: (eklenen) => {
        this.personeller.push(eklenen);
        this.yeniPersonel = { id: 0, ad: '', soyad: '', departman: '' };
      },
      error: (err) => {
        console.error("Kayıt hatası:", err);
        alert("Sunucu hatası: Kayıt oluşturulamadı.");
      }
    });
  }
}
