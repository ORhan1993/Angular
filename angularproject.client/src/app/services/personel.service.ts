import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// YENİ: Ortam değişkenleri dosyamızı import ediyoruz
// DİKKAT: Her zaman 'environment' (production) olanı import ederiz. 
// Angular geliştirme modundayken onu otomatik olarak 'environment.development' ile değiştirir.
import { environment } from '../../environments/environment';

export interface Personel {
  id: number;
  ad: string;
  soyad: string;
  departman: string;
}

@Injectable({ providedIn: 'root' })
export class PersonelService {

  // YENİ: Artık hardcoded adres yok. Kök adresi environment'tan alıp sonuna '/personel' ekliyoruz
  private apiUrl = `${environment.apiUrl}/personel`;

  constructor(private http: HttpClient) { }

  getPersoneller(): Observable<Personel[]> {
    return this.http.get<Personel[]>(this.apiUrl);
  }

  addPersonel(personel: Personel): Observable<Personel> {
    return this.http.post<Personel>(this.apiUrl, personel);
  }

  deletePersonel(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updatePersonel(id: number, personel: Personel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, personel);
  }
}
