import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personel } from '../../services/personel.service';

// MATERIAL MODÜLLERİ (Hataların çözümü için şart)
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personel-list',
  templateUrl: './personel-list.component.html',
  styleUrls: ['./personel-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PersonelListComponent {
  // PARENT'TAN (PersonelComponent) GELECEK VERİLER
  @Input() personeller: Personel[] = [];
  @Input() aramaMetni: string = '';

  // PARENT'A HABER VERİLECEK OLAYLAR
  @Output() secildi = new EventEmitter<Personel>();
  @Output() silindi = new EventEmitter<number>();

  // Tablo sütunları
  displayedColumns: string[] = ['ad', 'soyad', 'departman', 'islem'];

  // HTML tarafındaki hata (TS2339) çözümü için bu getter şart:
  get gorunenPersoneller(): Personel[] {
    return this.personeller.filter(p =>
      p.ad.toLowerCase().includes(this.aramaMetni.toLowerCase()) ||
      p.soyad.toLowerCase().includes(this.aramaMetni.toLowerCase())
    );
  }

  // HTML'deki (click) olayları için metotlar:
  onSec(personel: Personel) {
    this.secildi.emit(personel);
  }

  onSil(id: number) {
    this.silindi.emit(id);
  }
}
