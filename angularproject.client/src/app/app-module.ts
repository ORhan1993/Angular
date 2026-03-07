import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';
import { PersonelListComponent } from './personel/personel-list/personel-list.component';
import { PersonelFormComponent } from './personel/personel-form/personel-form.component';
import { authInterceptor } from './interceptors/auth-interceptor';

@NgModule({
  declarations: [App, PersonelComponent], // Sadece standalone olmayanlar
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule,
    AnasayfaComponent, PersonelListComponent, PersonelFormComponent, // Standalone olanlar
    MatSnackBarModule, MatDialogModule // Material modülleri
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
