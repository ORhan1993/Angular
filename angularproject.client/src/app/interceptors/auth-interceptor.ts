import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt_token');

  if (token) {
    // Token varsa, isteğin içine Authorization başlığını (Bearer Token) ekleyip klonluyoruz
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // Token yoksa isteği olduğu gibi gönder
  return next(req);
};
