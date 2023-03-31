import { TestBed } from '@angular/core/testing';

import { CaractereService } from './caractere.service';

describe('CaractereService', () => {
  let service: CaractereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaractereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
