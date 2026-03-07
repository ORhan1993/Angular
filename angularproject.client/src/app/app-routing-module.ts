import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';
// Düzeltilmiş satır aşağıdadır:
import { authGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', component: AnasayfaComponent },
  { path: 'personel', component: PersonelComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
