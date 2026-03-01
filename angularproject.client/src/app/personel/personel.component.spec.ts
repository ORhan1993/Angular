import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelComponent } from './personel.component';

describe('Personel', () => {
  let component: PersonelComponent;
  let fixture: ComponentFixture<PersonelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
