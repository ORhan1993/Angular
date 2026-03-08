import { Component, OnInit, inject } from '@angular/core'; // YENİ: inject eklendi
import { CommonModule } from '@angular/common';
import { PersonelService, Personel } from '../services/personel.service';
import { NotifyService } from '../services/notify.service';
import { SearchService } from '../services/search.service';
import { PersonelListComponent } from './personel-list/personel-list.component';
import { PersonelFormComponent } from './personel-form/personel-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personel',
  standalone: true,
  imports: [CommonModule, PersonelListComponent, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './personel.component.html'
})
export class PersonelComponent implements OnInit {
  personeller: Personel[] = [];

  // HATA ÇÖZÜMÜ: Constructor yerine modern inject() fonksiyonunu kullanıyoruz.
  // Böylece sınıf yüklenir yüklenmez servis hazır oluyor ve hata vermiyor.
  public searchService = inject(SearchService);
  aramaMetni = this.searchService.searchQuery;

  constructor(
    private personelService: PersonelService,
    private notify: NotifyService,
    // searchService buradan silindi çünkü yukarıda inject ile aldık
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listele();
  }

  listele() {
    this.personelService.getPersoneller().subscribe({
      next: (data) => this.personeller = data,
      error: () => this.notify.showError('Veriler yüklenemedi!')
    });
  }

  yeniPersonelEkle() {
    const dialogRef = this.dialog.open(PersonelFormComponent, { width: '400px', data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personelService.addPersonel(result).subscribe({
          next: () => {
            this.notify.showSuccess('Yeni personel başarıyla eklendi.');
            this.listele();
          },
          error: () => this.notify.showError('Ekleme işlemi başarısız.')
        });
      }
    });
  }

  personelSec(p: Personel) {
    const dialogRef = this.dialog.open(PersonelFormComponent, { width: '400px', data: p });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personelService.updatePersonel(result.id, result).subscribe({
          next: () => {
            this.notify.showSuccess('Personel başarıyla güncellendi.');
            this.listele();
          },
          error: () => this.notify.showError('Güncelleme işlemi başarısız.')
        });
      }
    });
  }

  personelSil(id: number) {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      this.personelService.deletePersonel(id).subscribe({
        next: () => {
          this.notify.showSuccess('Personel başarıyla silindi.');
          this.listele();
        },
        error: () => this.notify.showError('Silme işlemi başarısız.')
      });
    }
  }
}
