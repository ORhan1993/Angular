import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonelService, Personel } from '../services/personel.service';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AnasayfaComponent implements OnInit {
  toplamPersonel: number = 0;

  constructor(
    private personelService: PersonelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.personelService.getPersoneller().subscribe({
      next: (data: Personel[]) => {
        // Tip güvenliği ve veri kontrolü
        if (Array.isArray(data)) {
          this.toplamPersonel = data.length;
        } else {
          this.toplamPersonel = 0;
        }
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        console.error("Ana sayfa veri çekme hatası:", err);
      }
    });
  }
}
