import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) { }

  // Başarılı işlemler için yeşilimsi/standart bildirim
  showSuccess(message: string) {
    this.snackBar.open(message, 'Tamam', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  // Hata durumları için bildirim
  showError(message: string) {
    this.snackBar.open(message, 'Kapat', {
      duration: 5000,
      panelClass: ['error-snackbar'] // Global CSS'de tanımlanabilir
    });
  }
}
