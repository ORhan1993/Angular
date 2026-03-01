import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// 1. ESKİ HttpClientModule YERİNE YENİ NESİL KÜTÜPHANEYİ ÇEKİYORUZ
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
// Sayfalarımızı modüle tanıtıyoruz (eğer Standalone değil olarak üretildilerse)
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';

@NgModule({
  declarations: [
    App,
    AnasayfaComponent,
    PersonelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule // Rota modülümüzü ekledik
  ],
  providers: [
    // 2. HTTP İŞLEMLERİNİ ARTIK BURADA PROVIDE EDİYORUZ
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
