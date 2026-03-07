import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PersonelService, Personel } from '../../services/personel.service';
import { CommonModule } from '@angular/common';
// YENİ: MatSnackBar servisini import ediyoruz
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personel-list',
  templateUrl: './personel-list.component.html',
  styleUrls: ['./personel-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonelListComponent implements OnInit {

  personeller: Personel[] = [];
  aramaMetni: string = '';
  seciliPersonel: Personel | null = null;

  // YENİ: constructor içine snackBar'ı enjekte (inject) ediyoruz
  constructor(
    private personelService: PersonelService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listeyiGetir();
  }

  listeyiGetir() {
    this.personelService.getPersoneller().subscribe({
      next: (data) => {
        this.personeller = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Veri çekme hatası:", err)
    });
  }

  personelSec(personel: Personel) {
    this.seciliPersonel = personel;
  }

  personelSil(id: number) {
    if (!confirm("Emin misin?")) return;

    this.personelService.deletePersonel(id).subscribe({
      next: () => {
        this.personeller = this.personeller.filter(p => p.id !== id);
        if (this.seciliPersonel?.id === id) this.seciliPersonel = null;

        // YENİ: Başarıyla silinince bildirim göster
        // Kullanımı: .open('Mesaj', 'Buton Yazısı', { ayarlar })
        this.snackBar.open('Personel başarıyla silindi!', 'Kapat', {
          duration: 3000, // 3 saniye sonra otomatik kapanır
          horizontalPosition: 'right', // Sağ tarafta çıksın
          verticalPosition: 'bottom' // Alt tarafta çıksın
        });
      }
    });
  }

  vazgecildi() {
    this.seciliPersonel = null;
  }

  formdanGelenVeriyiKaydet(formVerisi: any) {
    if (this.seciliPersonel) {
      // GÜNCELLEME İŞLEMİ
      const islemGorecekKayit = { id: this.seciliPersonel.id, ...formVerisi };

      this.personelService.updatePersonel(this.seciliPersonel.id, islemGorecekKayit).subscribe({
        next: () => {
          this.listeyiGetir();
          this.seciliPersonel = null;

          // YENİ: Güncelleme bildirimi
          this.snackBar.open('Personel bilgileri güncellendi.', 'Tamam', { duration: 3000 });
        }
      });

    } else {
      // YENİ EKLEME İŞLEMİ
      this.personelService.addPersonel(formVerisi).subscribe({
        next: (eklenen) => {
          this.personeller = [...this.personeller, eklenen];
          this.seciliPersonel = null;

          // YENİ: Ekleme bildirimi
          this.snackBar.open('Yeni personel başarıyla sisteme eklendi!', 'Harika', { duration: 3000 });
        }
      });
    }
  }
}
