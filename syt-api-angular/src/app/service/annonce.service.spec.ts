import { TestBed } from '@angular/core/testing';

import { AnnonceService } from './annonce.service';

describe('Annonce.ServiceService', () => {
  let service: AnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
