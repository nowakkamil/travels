import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import { User } from '../_models/user';

const userFixture = {
  key: 'test key',
  email: 'test email',
  userName: 'test username'
};

const usersFixture: User[] = [User.fromInterface(userFixture)];

describe('UsersService', () => {
  let httpMock: HttpTestingController;
  let service: UsersService;

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
  const angularFireSpy = jasmine.createSpyObj('AngularFireDatabase', {
    list: listSpy
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        { provide: AngularFireDatabase, useValue: angularFireSpy }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllPromise', () => {
    const users$ = service.getAllPromise();
    users$.subscribe(users => {
      const user = User.fromInterface(users[0]);
      const expectedUser = usersFixture[0];

      expect(user).toEqual(expectedUser);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
