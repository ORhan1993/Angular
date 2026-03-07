import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
// YENİ: Standalone yapabilmek için CommonModule ve ReactiveFormsModule ekliyoruz
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Personel } from '../../services/personel.service';

// YENİ: Material Form ve Buton modüllerini import ediyoruz
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-personel-form',
  templateUrl: './personel-form.component.html',
  // 1. standalone: true yapıyoruz
  standalone: true,
  // 2. İhtiyacımız olan tüm modülleri buraya ekliyoruz
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PersonelFormComponent implements OnChanges {
  @Input() seciliPersonel: Personel | null = null;
  @Output() formGonder = new EventEmitter<any>();
  @Output() formIptal = new EventEmitter<void>();

  // Form tanımlamamız aynı kalıyor
  personelForm = new FormGroup({
    ad: new FormControl('', [Validators.required, Validators.minLength(2)]),
    soyad: new FormControl('', Validators.required),
    departman: new FormControl('', Validators.required)
  });

  ngOnChanges() {
    if (this.seciliPersonel) {
      this.personelForm.patchValue({
        ad: this.seciliPersonel.ad,
        soyad: this.seciliPersonel.soyad,
        departman: this.seciliPersonel.departman
      });
    } else {
      this.personelForm.reset();
    }
  }

  kaydet() {
    if (this.personelForm.invalid) return;
    this.formGonder.emit(this.personelForm.value);
    this.personelForm.reset();
  }

  vazgec() {
    this.personelForm.reset();
    this.formIptal.emit();
  }
}
