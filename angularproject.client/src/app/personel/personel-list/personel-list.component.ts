import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personel } from '../../services/personel.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-personel-list',
  templateUrl: './personel-list.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule]
})
export class PersonelListComponent implements OnChanges, AfterViewInit {
  @Input() personeller: Personel[] = [];
  @Input() aramaMetni: string = '';

  @Output() secildi = new EventEmitter<Personel>();
  @Output() silindi = new EventEmitter<number>();

  displayedColumns: string[] = ['ad', 'soyad', 'departman', 'islem'];
  dataSource = new MatTableDataSource<Personel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['personeller']) {
      this.dataSource.data = this.personeller;
    }

    // Arama metni değiştiğinde Material Table filter'ını güncelle
    if (changes['aramaMetni']) {
      this.dataSource.filter = this.aramaMetni.trim().toLowerCase();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSec(p: Personel) {
    this.secildi.emit(p);
  }

  onSil(id: number) {
    this.silindi.emit(id);
  }
}
