import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Arayüz burada tanımlı ve dışa açık
export interface Personel {
  id: number;
  ad: string;
  soyad: string;
  departman: string;
}

@Injectable({ providedIn: 'root' })
export class PersonelService {

  // ÇÖZÜM BURADA: apiUrl değişkenini sınıf seviyesinde tanımlıyoruz.
  // Projenin backend adresine göre burayı düzenleyebilirsin (örn: 'https://localhost:7123/api/personel')
  // Eğer proxy.conf.js kullanıyorsan sadece '/api/personel' yazman yeterlidir.
  private apiUrl = '/api/personel';
  constructor(private http: HttpClient) { }

  getPersoneller(): Observable<Personel[]> {
    return this.http.get<Personel[]>('/api/personel');
  }

  addPersonel(personel: Personel): Observable<Personel> {
    return this.http.post<Personel>('/api/personel', personel);
  }
  // ID parametresi alarak API'ye HTTP DELETE isteği gönderen metot
  deletePersonel(id: number) {
    // apiUrl sonuna silinecek ID'yi ekliyoruz. Örn: https://localhost:5001/api/personel/5
    // Geriye dönen veri tipi önemli olmadığı için <any> veya <void> kullanabiliriz
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 4. UPDATE: Mevcut personeli güncelle (HTTP PUT)
  // Güncellenecek kaydın ID'sini ve yeni verileri (personel) parametre olarak alıyoruz
  updatePersonel(id: number, personel: Personel): Observable<any> {
    // Backend API'ye PUT isteği atıyoruz. (Örn: PUT /api/personel/5)
    // İkinci parametre olarak güncellenmiş nesneyi (body) gönderiyoruz.
    return this.http.put(`${this.apiUrl}/${id}`, personel);
  }
}
