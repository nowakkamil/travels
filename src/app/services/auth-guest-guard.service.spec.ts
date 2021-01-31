import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthGuestGuardService } from './auth-guest-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuestGuardService', () => {
  let service: AuthGuestGuardService;

  const snapshotChangesResult = [{
    payload: {
      val: () => ({
        key: 'test key',
        email: 'test email',
        userName: 'test username'
      })
    }
  }];
  const listSpy = jasmine.createSpyObj({
    snapshotChanges: of(snapshotChangesResult)
  });
  const authServiceSpy = jasmine.createSpyObj({
    list: listSpy
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuestGuardService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    service = TestBed.inject(AuthGuestGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
