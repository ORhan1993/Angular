import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Personel } from '../../services/personel.service';

// Özel Doğrulayıcı (Sadece Harf)
export function sadeceHarfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const gecerli = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(control.value);
    return gecerli ? null : { 'sadeceHarfHata': true };
  };
}

@Component({
  selector: 'app-personel-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Personel Düzenle' : 'Yeni Personel Ekle' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="personelForm" style="display: flex; flex-direction: column; gap: 15px; min-width: 300px; padding-top: 10px;">
        
        <mat-form-field appearance="outline">
          <mat-label>Ad</mat-label>
          <input matInput formControlName="ad">
          <mat-error *ngIf="personelForm.get('ad')?.hasError('required')">Ad zorunludur.</mat-error>
          <mat-error *ngIf="personelForm.get('ad')?.hasError('sadeceHarfHata')">İsimde rakam kullanılamaz.</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Soyad</mat-label>
          <input matInput formControlName="soyad">
          <mat-error *ngIf="personelForm.get('soyad')?.hasError('sadeceHarfHata')">Soyadda rakam kullanılamaz.</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Departman</mat-label>
          <input matInput formControlName="departman">
        </mat-form-field>

      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="vazgec()">İptal</button>
      <button mat-flat-button color="primary" [disabled]="personelForm.invalid" (click)="kaydet()">Kaydet</button>
    </mat-dialog-actions>
  `
})
export class PersonelFormComponent implements OnInit {
  personelForm = new FormGroup({
    id: new FormControl(0),
    ad: new FormControl('', [Validators.required, Validators.minLength(2), sadeceHarfValidator()]),
    soyad: new FormControl('', [Validators.required, sadeceHarfValidator()]),
    departman: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<PersonelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personel | null
  ) { }

  ngOnInit() {
    if (this.data) {
      this.personelForm.patchValue(this.data);
    }
  }

  kaydet() {
    if (this.personelForm.valid) {
      this.dialogRef.close(this.personelForm.value);
    }
  }

  vazgec() {
    this.dialogRef.close();
  }
}
