import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component'; // Yeni bileşen eklendi

const routes: Routes = [
  { path: '', component: AnasayfaComponent },
  { path: 'personel', component: PersonelComponent }, // Artık '/personel' yolunda PersonelComponent açılacak
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
