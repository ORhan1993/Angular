import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// YENİ: Material bileşenlerinin animasyonları (Sidenav kayması vb.) için gerekli
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
// YENİ: Sidebar, Toolbar ve Menü ikonları için gereken Material modülleri
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';
import { PersonelListComponent } from './personel/personel-list/personel-list.component';
import { PersonelFormComponent } from './personel/personel-form/personel-form.component';
import { authInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [App], // Sadece standalone olmayan App bileşeni burada
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Sidenav animasyonları için eklendi
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Standalone bileşenlerimiz
    AnasayfaComponent,
    PersonelComponent,
    PersonelListComponent,
    PersonelFormComponent,

    // Material Modüllerimiz
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,    // YENİ: Yan menü konteyneri
    MatToolbarModule,    // YENİ: Üstteki mavi bar
    MatListModule,       // YENİ: Yan menüdeki liste elemanları
    MatIconModule,       // YENİ: Menü ve buton ikonları
    MatButtonModule      // YENİ: Material buton tasarımları
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
