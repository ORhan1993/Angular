import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Bileşenleri import ediyoruz
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';
import { PersonelListComponent } from './personel/personel-list/personel-list.component';
import { PersonelFormComponent } from './personel/personel-form/personel-form.component';

// Interceptor
import { authInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    App,
    PersonelComponent // Standalone olmayan tek bileşen
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Standalone (Bağımsız) bileşenler buraya eklenir
    AnasayfaComponent,
    PersonelListComponent,
    PersonelFormComponent,

    // Material Modülleri
    MatSnackBarModule
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
  ],
  bootstrap: [App],
})
export class AppModule { }
