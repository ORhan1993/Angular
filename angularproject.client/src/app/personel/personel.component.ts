import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PersonelService, Personel } from '../services/personel.service';
import { NotifyService } from '../services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';

@Component({
  selector: 'app-personel',
  templateUrl: './personel.component.html',
  standalone: false
})
export class PersonelComponent implements OnInit {
  personeller: Personel[] = [];
  aramaMetni: string = '';
  seciliPersonel: Personel | null = null;

  constructor(
    private personelService: PersonelService,
    private notify: NotifyService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { this.listeyiGetir(); }

  listeyiGetir() {
    this.personelService.getPersoneller().subscribe(data => {
      this.personeller = data;
      this.cdr.detectChanges();
    });
  }

  personelSec(p: Personel) { this.seciliPersonel = p; }

  personelSil(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(sonuc => {
      if (sonuc) {
        this.personelService.deletePersonel(id).subscribe(() => {
          this.personeller = this.personeller.filter(p => p.id !== id);
          this.notify.showSuccess('Personel silindi.');
        });
      }
    });
  }

  // Hata Çözümü: Metot ismi HTML ile uyumlu hale getirildi
  vazgecildi() {
    this.seciliPersonel = null;
  }

  // Hata Çözümü: Metot ismi HTML ile uyumlu hale getirildi
  formdanGelenVeriyiKaydet(formVerisi: any) {
    if (this.seciliPersonel) {
      this.personelService.updatePersonel(this.seciliPersonel.id, { ...this.seciliPersonel, ...formVerisi }).subscribe(() => {
        this.listeyiGetir();
        this.seciliPersonel = null;
        this.notify.showSuccess('Personel güncellendi.');
      });
    } else {
      this.personelService.addPersonel(formVerisi).subscribe(yeni => {
        this.personeller = [...this.personeller, yeni];
        this.notify.showSuccess('Yeni personel eklendi.');
      });
    }
  }
}
