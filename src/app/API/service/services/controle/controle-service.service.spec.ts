import { TestBed } from '@angular/core/testing';

import { ControleService } from './controle-service.service';

describe('ControleServiceService', () => {
  let service: ControleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
