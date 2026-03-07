import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelForm } from './personel-form.component';

describe('PersonelForm', () => {
  let component: PersonelForm;
  let fixture: ComponentFixture<PersonelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonelForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonelForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
