import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router'; // router-outlet'i tanıması için eklendi
import { App } from './app';

// 'App' bileşeni için test senaryolarımızı başlatıyoruz
describe('App Bileşeni (Layout)', () => {

  // Her testten önce çalışacak hazırlık aşaması
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]) // HTML'deki <router-outlet> etiketinin hata vermesini engeller
      ],
      declarations: [
        App
      ],
    }).compileComponents();
  });

  // 1. TEST: Bileşen sorunsuz bir şekilde ayağa kalkıyor mu?
  it('uygulama (app) sorunsuz oluşturulmalı', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // app değişkeni var mı (true mu) diye kontrol eder
  });

  // 2. TEST: Ekranda (HTML) Navbar başlığımız doğru yazıyor mu?
  it('menüde "Mini CRM" başlığı bulunmalı', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // HTML değişikliklerini tetikler
    const compiled = fixture.nativeElement as HTMLElement;

    // h2 etiketini bul ve içinde 'Mini CRM' yazıyor mu diye bak
    expect(compiled.querySelector('h2')?.textContent).toContain('Mini CRM');
  });
});
