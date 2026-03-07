// 'signal' kütüphanesini import etmeyi unutmuyoruz
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 1. SIGNAL TANIMLAMA: Başlangıç değeri 'false' olan bir sinyal oluşturduk
  isLoggedIn = signal<boolean>(false);

  login() {
    // 2. DEĞER ATAMA: Sinyalin değerini değiştirmek için .set() kullanırız
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }
}
