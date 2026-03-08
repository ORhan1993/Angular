import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5;">
      <mat-card style="width: 400px; padding: 30px; border-radius: 8px;" class="mat-elevation-z8">
        <mat-card-header style="justify-content: center; margin-bottom: 20px;">
          <mat-icon color="primary" style="font-size: 40px; width: 40px; height: 40px; margin-right: 10px;">person_add</mat-icon>
          <mat-card-title style="font-size: 24px;">Yeni Hesap Oluştur</mat-card-title>
        </mat-card-header>
        
        <form [formGroup]="registerForm" (ngSubmit)="onRegister()" style="display: flex; flex-direction: column; gap: 10px;">
          
          <mat-form-field appearance="outline">
            <mat-label>Kullanıcı Adı</mat-label>
            <input matInput formControlName="username" placeholder="Örn: kullanici123">
            <mat-error *ngIf="registerForm.get('username')?.hasError('required')">Kullanıcı adı zorunludur.</mat-error>
            <mat-error *ngIf="registerForm.get('username')?.hasError('minlength')">En az 4 karakter olmalıdır.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Şifre</mat-label>
            <input matInput type="password" formControlName="password">
            <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Şifre zorunludur.</mat-error>
            <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">En az 6 karakter olmalıdır.</mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid" style="padding: 24px 0; font-size: 16px;">
            Kayıt Ol
          </button>

          <div style="text-align: center; margin-top: 15px;">
            <span style="color: #666;">Zaten hesabın var mı? </span>
            <a routerLink="/login" style="color: #3f51b5; text-decoration: none; font-weight: bold;">Giriş Yap</a>
          </div>
        </form>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotifyService
  ) { }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.username!, this.registerForm.value.password!).subscribe({
        next: () => {
          this.notify.showSuccess('Kayıt başarılı! Lütfen giriş yapınız.');
          this.router.navigate(['/login']);
        },
        error: (err: any) => { // HATA ÇÖZÜMÜ: err: any olarak belirtildi
          this.notify.showError(err.error || 'Kayıt işlemi başarısız oldu!');
        }
      });
    }
  }
}
