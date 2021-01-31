import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { TravelsService } from 'src/app/services/travels.service';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';

import { TripDetailsComponent } from './trip-details.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Trip } from 'src/app/_models/trip';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;

  const tripFixture = {
    key: 'a',
    id: 4,
    description: 'Finest trip description (1)',
    destination: 'Country #1',
    name: 'Name: \'1\'',
    photoUrl: 'https://picsum.photos/id/10/448',
    startDate: 1608412839805,
    endDate: 1608412839805,
    maxPeopleCount: 1,
    currentPeopleCount: 0,
    rating: 2,
    price: 1199,
    comments: null
  };

  const commentsFixture = [{
    date: 1608412839805,
    content: 'test content',
    authorId: 'test authorId',
    displayTime: 'test display',
  }];

  const tripsFixture: Trip[] = [Trip.fromAngularInterface({ ...tripFixture }, commentsFixture)];

  const snapshotChangesResult = [{
    payload: {
      val: () => tripsFixture
    }
  }];
  const listSpy = jasmine.createSpyObj({
    snapshotChanges: of(snapshotChangesResult)
  });
  const angularFireSpy = jasmine.createSpyObj('AngularFireDatabase', {
    list: listSpy
  });

  const authServiceSpy = jasmine.createSpyObj({
    isLoggedIn: new Promise<boolean>(res => res(true)),
    getUserId: new Promise<string>(res => res('123'))
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
    getAllPromise: () => of([{}]),
    updateComments: () => new Promise<void>(res => res())
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

  it('should properly handle submission of new comment', async () => {
    component.trip = tripsFixture[0];
    await expectAsync(component.handleSubmit()).toBeResolved();
  });
});
