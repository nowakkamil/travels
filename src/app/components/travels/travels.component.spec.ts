import { TravelsService } from './../../services/travels.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { of, Subject } from 'rxjs';

import { TravelsComponent } from './travels.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Trip } from 'src/app/_models/trip';

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

describe('TravelsComponent', () => {
  let component: TravelsComponent;
  let fixture: ComponentFixture<TravelsComponent>;

  const authServiceSpy = jasmine.createSpyObj({
    isLoggedIn: new Promise<boolean>(res => res(true)),
    isAdmin: new Promise<boolean>(res => res(true)),
    getUserEmail: new Promise<string>(res => res('test mail'))
  });

  const travelsServiceSpy = jasmine.createSpyObj({
    getAll: jasmine.createSpyObj({ tripsFixture }),
    getAllPromise: () => of(tripsFixture),
    filterChange: () => new Subject().next(tripsFixture)
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelsComponent],
      providers: [
        ShoppingCartService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TravelsService, useValue: travelsServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: Enable
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
