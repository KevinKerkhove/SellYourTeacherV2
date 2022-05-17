import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceInscriptionComponent } from './annonce-inscription.component';

describe('AnnonceInscriptionComponent', () => {
  let component: AnnonceInscriptionComponent;
  let fixture: ComponentFixture<AnnonceInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnonceInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
