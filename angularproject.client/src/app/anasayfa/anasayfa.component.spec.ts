import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anasayfa } from './anasayfa.component';

describe('Anasayfa', () => {
  let component: Anasayfa;
  let fixture: ComponentFixture<Anasayfa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Anasayfa],
    }).compileComponents();

    fixture = TestBed.createComponent(Anasayfa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
