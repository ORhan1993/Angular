import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Servisimizi inject ediyoruz
  const authService = inject(AuthService);

  // Eğer kullanıcı giriş yapmış durumdaysa (Signal'i parantez ile okuyoruz)
  if (authService.isLoggedIn()) {

    // DİKKAT: Angular'da HTTP Request'leri değiştirilemez (immutable) nesnelerdir.
    // Bu yüzden isteğin doğrudan üzerine yazamayız, clone() ile kopyasını alıp onu değiştiririz.
    const klonlanmisIstek = req.clone({
      setHeaders: {
        Authorization: `Bearer BENIM_GIZLI_TOKEN_12345`
      }
    });

    // Değiştirilmiş yeni isteği backend'e doğru yola çıkarıyoruz
    return next(klonlanmisIstek);
  }

  // Eğer kullanıcı giriş yapmamışsa, isteğe hiç dokunmadan olduğu gibi yola devam ettir
  return next(req);
};
