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
  constructor(private http: HttpClient) { }

  getPersoneller(): Observable<Personel[]> {
    return this.http.get<Personel[]>('/api/personel');
  }

  addPersonel(personel: Personel): Observable<Personel> {
    return this.http.post<Personel>('/api/personel', personel);
  }
}
