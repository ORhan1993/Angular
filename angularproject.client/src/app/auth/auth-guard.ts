import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// CanActivateFn, bir rotaya girilip girilemeyeceğini belirleyen fonksiyondur
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // DİKKAT: authService.isLoggedIn() şeklinde parantez ile çağırıyoruz
  if (authService.isLoggedIn()) {
    return true;
  } else {
    alert('Bu sayfayı görmek için giriş yapmalısınız!');
    router.navigate(['/']);
    return false;
  }
};
