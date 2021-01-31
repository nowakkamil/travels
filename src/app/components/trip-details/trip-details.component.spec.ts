import { User } from 'src/app/_models/user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { TravelsService } from 'src/app/services/travels.service';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';

import { TripDetailsComponent } from './trip-details.component';
import { AngularFireDatabase } from '@angular/fire/database';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;

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

  const authServiceSpy = jasmine.createSpyObj({
    isLoggedIn: new Promise<boolean>(res => res(true))
  });

  const usersFixture = [{
    email: 'test email',
    key: 'tes key',
    userName: 'test username'
  }];
  const usersServiceMock = {
    getAll: [{}],
    getAllPromise: () => of(usersFixture)
  };

  const travelsServiceMock = {
    getAll: [{}],
    getAllPromise: () => of([{}])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripDetailsComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: TravelsService, useValue: travelsServiceMock },
        { provide: AngularFireDatabase, useValue: angularFireSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
