import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personel } from '../../services/personel.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-personel-list',
  templateUrl: './personel-list.component.html',
  standalone: true, // Modülsüz mimari
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class PersonelListComponent {
  @Input() personeller: Personel[] = []; // Parent'tan gelen ana liste
  @Input() aramaMetni: string = ''; // Navbar/Input'tan gelen filtre

  @Output() secildi = new EventEmitter<Personel>(); // Düzenle butonu olayı
  @Output() silindi = new EventEmitter<number>(); // Sil butonu olayı

  // Material tablo sütun başlıkları
  displayedColumns: string[] = ['ad', 'soyad', 'departman', 'islem'];

  // Dinamik filtreleme yapan getter
  get gorunenPersoneller(): Personel[] {
    return this.personeller.filter(p =>
      p.ad.toLowerCase().includes(this.aramaMetni.toLowerCase()) ||
      p.soyad.toLowerCase().includes(this.aramaMetni.toLowerCase())
    );
  }

  onSec(p: Personel) { this.secildi.emit(p); }
  onSil(id: number) { this.silindi.emit(id); }
}
