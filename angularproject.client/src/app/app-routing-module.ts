import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { PersonelComponent } from './personel/personel.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component'; // YENİ
import { authGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', component: AnasayfaComponent, canActivate: [authGuard] },
  { path: 'personel', component: PersonelComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // YENİ ROTA
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
