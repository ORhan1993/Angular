import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { FormsModule } from '@angular/forms'; // FormsModule'ü unutma

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App],
      imports: [HttpClientTestingModule, FormsModule] // FormsModule eklendi
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve personeller from the server', () => {
    const mockPersoneller = [
      { id: 1, ad: 'Orhan', soyad: 'Bozgeyik', departman: 'IT' },
      { id: 2, ad: 'Test', soyad: 'User', departman: 'HR' }
    ];

    component.ngOnInit();

    // Servisteki URL ile eşleşmeli
    const req = httpMock.expectOne('/api/personel');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPersoneller);

    // 'forecasts' yerine 'personeller' değişkenini kontrol ediyoruz
    expect(component.personeller).toEqual(mockPersoneller);
  });
}); // <--- Syntax hatası burada düzeltildi
