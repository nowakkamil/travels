import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  let service: AuthService;

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
  const AngularFireDatabaseSpy = jasmine.createSpyObj('AngularFireDatabase', {
    list: listSpy
  });

  const authResult = [{
    key: 'test key',
    email: 'test email',
    userName: 'test username'
  }];
  const angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', {
    authState: of(authResult)
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AngularFireDatabase, useValue: AngularFireDatabaseSpy },
        { provide: AngularFireAuth, useValue: angularFireAuthSpy }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
