import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

import { TravelsService } from './travels.service';
import { Trip } from '../_models/trip';

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

describe('TravelsService', () => {
  let httpMock: HttpTestingController;
  let service: TravelsService;

  const snapshotChangesResult = [{
    payload: {
      val: () => ({
        id: 1,
        key: 'a',
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
        comments: [{
          date: 1608412839805,
          content: 'test content',
          authorId: 'test authorId',
          displayTime: 'test display',
        }]
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
        TravelsService,
        { provide: AngularFireDatabase, useValue: angularFireSpy }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TravelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllPromise', () => {
    const trips$ = service.getAllPromise();
    trips$.subscribe(trips => {
      const trip = Trip.fromAngularInterface(trips[0], trips[0].comments);
      const expectedTrip = tripsFixture[0];
      expectedTrip.id = Trip.lastId;

      expect(trip).toEqual(expectedTrip);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
