import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelListComponent } from './personel-list.component';

describe('PersonelList', () => {
  let component: PersonelListComponent;
  let fixture: ComponentFixture<PersonelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonelListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonelListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
