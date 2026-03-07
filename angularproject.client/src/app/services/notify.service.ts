import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Tamam', {
      duration: 3000,
      panelClass: ['success-snackbar'], // CSS ile renk verebiliriz
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Kapat', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
