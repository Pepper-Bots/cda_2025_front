import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { vendeurGuard } from './vendeur.guard';

describe('vendeurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => vendeurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
