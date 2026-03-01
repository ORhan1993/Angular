import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonelService, Personel } from '../services/personel.service';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  styleUrls: ['./personel.component.css'],
  standalone: false
})
export class PersonelComponent implements OnInit {
  personeller: Personel[] = [];
  seciliPersonelId: number = 0;
  aramaMetni: string = '';

  constructor(
    private personelService: PersonelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listeyiGetir();
  }

  // Arama filtresi: Sadece aranan kelimeyle eşleşenleri gösterir
  get gorunenPersoneller() {
    return this.personeller.filter(p =>
      p.ad.toLowerCase().includes(this.aramaMetni.toLowerCase()) ||
      p.soyad.toLowerCase().includes(this.aramaMetni.toLowerCase())
    );
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

  kaydetVeyaGuncelle(form: NgForm) {
    if (form.invalid) return;

    const veri = form.value;
    const islemGorecekKayit = { id: this.seciliPersonelId, ...veri };

    if (this.seciliPersonelId > 0) {
      this.personelService.updatePersonel(this.seciliPersonelId, islemGorecekKayit as any).subscribe({
        next: () => {
          this.listeyiGetir();
          this.formuSifirla(form);
        }
      });
    } else {
      this.personelService.addPersonel(islemGorecekKayit as any).subscribe({
        next: (eklenen) => {
          this.personeller.push(eklenen);
          this.formuSifirla(form);
        }
      });
    }
  }

  personelSec(personel: any, form: NgForm) {
    this.seciliPersonelId = personel.id;
    form.setValue({
      ad: personel.ad,
      soyad: personel.soyad,
      departman: personel.departman
    });
  }

  personelSil(id: number) {
    if (!confirm("Emin misin?")) return;
    this.personelService.deletePersonel(id).subscribe({
      next: () => {
        this.personeller = this.personeller.filter(p => p.id !== id);
      }
    });
  }

  formuSifirla(form: NgForm) {
    form.resetForm();
    this.seciliPersonelId = 0;
  }
}
