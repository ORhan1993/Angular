import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Ekleme: ChangeDetectorRef'i import ediyoruz
import { PersonelService } from '../services/personel.service';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css'],
  standalone: false
})
export class AnasayfaComponent implements OnInit {
  toplamPersonel: number = 0;

  // 2. Ekleme: Constructor'a enjekte ediyoruz
  constructor(
    private personelService: PersonelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.personelService.getPersoneller().subscribe({
      next: (data) => {
        console.log("Ana sayfa veriyi çekiyor:", data);

        // Veriyi atıyoruz
        this.toplamPersonel = data.length;

        // 3. Ekleme: Angular'a "Değişiklik var, ekranı hemen güncelle" diyoruz
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Ana sayfa hata:", err)
    });
  }
}
