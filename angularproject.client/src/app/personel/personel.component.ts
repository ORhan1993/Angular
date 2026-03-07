import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PersonelService, Personel } from '../services/personel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css'],
  standalone: false
})
export class PersonelComponent implements OnInit {
  personeller: Personel[] = [];
  aramaMetni: string = '';
  seciliPersonel: Personel | null = null;

  constructor(
    private personelService: PersonelService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listeyiGetir();
  }

  listeyiGetir(): void {
    this.personelService.getPersoneller().subscribe({
      next: (data: Personel[]) => {
        this.personeller = data;
        this.cdr.detectChanges();
      },
      error: (err: Error) => console.error("Veri çekme hatası:", err)
    });
  }

  // Düzeltme: Parametre tipini netleştirdik
  personelSec(personel: Personel): void {
    this.seciliPersonel = personel;
  }

  // Düzeltme: Parametre tipini netleştirdik
  personelSil(id: number): void {
    if (!confirm("Bu personeli silmek istediğinize emin misiniz?")) return;

    this.personelService.deletePersonel(id).subscribe({
      next: () => {
        this.personeller = this.personeller.filter(p => p.id !== id);
        if (this.seciliPersonel?.id === id) this.seciliPersonel = null;
        this.snackBar.open('Personel silindi.', 'Tamam', { duration: 3000 });
      }
    });
  }

  vazgecildi(): void {
    this.seciliPersonel = null;
  }

  formdanGelenVeriyiKaydet(formVerisi: Partial<Personel>): void {
    if (this.seciliPersonel) {
      const islemGorecekKayit: Personel = { ...this.seciliPersonel, ...formVerisi as Personel };
      this.personelService.updatePersonel(this.seciliPersonel.id, islemGorecekKayit).subscribe({
        next: () => {
          this.listeyiGetir();
          this.seciliPersonel = null;
          this.snackBar.open('Personel güncellendi.', 'Kapat', { duration: 3000 });
        }
      });
    } else {
      this.personelService.addPersonel(formVerisi as Personel).subscribe({
        next: (eklenen: Personel) => {
          this.personeller = [...this.personeller, eklenen];
          this.seciliPersonel = null;
          this.snackBar.open('Personel eklendi.', 'Tamam', { duration: 3000 });
        }
      });
    }
  }
}
