import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PersonelService } from '../services/personel.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-anasayfa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div style="padding: 20px; display: flex; gap: 20px;">
      
      <mat-card class="mat-elevation-z4" style="width: 300px;">
        <mat-card-header style="padding-bottom: 10px;">
          <mat-icon mat-card-avatar color="primary" style="transform: scale(1.5);">people</mat-icon>
          <mat-card-title>Toplam Personel</mat-card-title>
          <mat-card-subtitle>Sistemde kayıtlı çalışanlar</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content style="font-size: 48px; text-align: center; padding: 20px 0; color: #3f51b5; font-weight: bold;">
          {{ isLoading ? '...' : toplamPersonel }}
        </mat-card-content>
      </mat-card>

    </div>
  `
})
export class AnasayfaComponent implements OnInit {
  toplamPersonel: number = 0;
  isLoading: boolean = true;

  constructor(
    private personelService: PersonelService,
    private notify: NotifyService,
    private cdr: ChangeDetectorRef // YENİ: Ekran güncellemelerini zorlamak için
  ) { }

  ngOnInit() {
    console.log('Dashboard veri çekme isteği başlatıldı...');

    this.personelService.getPersoneller().subscribe({
      next: (data) => {
        console.log('API den gelen personel verisi:', data);
        this.toplamPersonel = data ? data.length : 0;
        this.isLoading = false;

        // YENİ: Veri geldi, Angular'a "Ekranı hemen güncelle!" diyoruz
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Dashboard veri çekme hatası: ", err);
        this.notify.showError('Dashboard verileri yüklenemedi!');
        this.toplamPersonel = 0;
        this.isLoading = false;

        // YENİ: Hata gelse bile "..." kalmasın, 0 yazsın ve ekranı güncellesin
        this.cdr.detectChanges();
      }
    });
  }
}
