import { TestBed } from '@angular/core/testing';

import { AuthGuestGuardService } from './auth-guest-guard.service';

describe('AuthGuestGuardService', () => {
  let service: AuthGuestGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuestGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
