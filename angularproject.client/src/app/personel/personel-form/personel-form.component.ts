import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Personel } from '../../services/personel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-personel-form',
  templateUrl: './personel-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class PersonelFormComponent implements OnChanges {
  @Input() seciliPersonel: Personel | null = null;
  @Output() formGonder = new EventEmitter<any>();
  @Output() formIptal = new EventEmitter<void>();

  personelForm = new FormGroup({
    ad: new FormControl('', [Validators.required, Validators.minLength(2)]),
    soyad: new FormControl('', Validators.required),
    departman: new FormControl('', Validators.required)
  });

  ngOnChanges() {
    if (this.seciliPersonel) {
      this.personelForm.patchValue(this.seciliPersonel);
    } else {
      this.personelForm.reset();
    }
  }

  // Hata Çözümü: Metot ismi 'kaydet' olarak güncellendi
  kaydet() {
    if (this.personelForm.valid) {
      this.formGonder.emit(this.personelForm.value);
    }
  }

  // Hata Çözümü: Metot ismi 'vazgec' olarak güncellendi
  vazgec() {
    this.personelForm.reset();
    this.formIptal.emit();
  }
}
