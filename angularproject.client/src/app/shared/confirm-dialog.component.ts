import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true, // Bağımsız bileşen
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Emin misiniz?</h2>
    <mat-dialog-content>
      Bu personeli silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onDismiss()">Vazgeç</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Sil</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  onConfirm(): void { this.dialogRef.close(true); } // Silme onayı
  onDismiss(): void { this.dialogRef.close(false); } // İptal
}
