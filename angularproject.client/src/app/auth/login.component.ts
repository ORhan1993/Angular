import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // YENİ: RouterModule eklendi
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  // YENİ: RouterModule imports dizisine eklendi
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
      <mat-card style="width: 350px; padding: 20px;">
        <mat-card-header style="justify-content: center; margin-bottom: 20px;">
          <mat-card-title>Sisteme Giriş</mat-card-title>
        </mat-card-header>
        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" style="display: flex; flex-direction: column;">
          
          <mat-form-field appearance="outline">
            <mat-label>Kullanıcı Adı</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Şifre</mat-label>
            <input matInput type="password" formControlName="password">
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid" style="padding: 24px 0; font-size: 16px;">
            Giriş Yap
          </button>

          <div style="text-align: center; margin-top: 15px;">
            <span style="color: #666;">Hesabın yok mu? </span>
            <a routerLink="/register" style="color: #3f51b5; text-decoration: none; font-weight: bold; cursor: pointer;">Kayıt Ol</a>
          </div>

        </form>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotifyService
  ) { }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
        next: () => {
          this.notify.showSuccess('Giriş başarılı!');
          this.router.navigate(['/']);
        },
        error: () => {
          this.notify.showError('Kullanıcı adı veya şifre hatalı!');
        }
      });
    }
  }
}
