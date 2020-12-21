import { Filter } from 'src/app/_types/filter';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../_models/trip';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TripAngularFire } from '../_models/trip-angular-fire';
import { map } from 'rxjs/operators';
import { Comment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  trips: Array<Trip>;
  unfilteredTrips: Array<Trip>;
  tripsAngularFireList: AngularFireList<TripAngularFire>;
  filter: Filter;
  filterChange = new Subject<Array<Trip>>();

  constructor(private db: AngularFireDatabase) {
    this.populateTrips();
  }

  populateTrips(): void {
    this.tripsAngularFireList = this.db.list<TripAngularFire>('/trips');
    this.tripsAngularFireList.snapshotChanges()
      .pipe(map(changes => changes.map(
        (c: { payload: { key: any; val: () => any; }; }) => ({ key: c.payload.key, ...c.payload.val() })))
      ).subscribe(
        response => {
          const trips = Array.isArray(response)
            ? response.map(trip => {
              const comments = trip.publicAccess
                ? trip.publicAccess.comments
                : [];
              return Trip.fromAngularInterface(trip, comments);
            })
            : [Trip.fromAngularInterface(response, null)];

          this.trips = trips;
          this.unfilteredTrips = trips;
          this.emitFilterChange();
        }, err => console.log(err));
  }

  getAll(): Array<Trip> {
    return this.trips;
  }

  getByKey(key: string): Trip | undefined {
    return this.trips.find(trip => trip.key === key);
  }

  getById(id: number): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  create(trip: Trip): void {
    const newTrip = TripAngularFire.fromInterface(trip);
    this.tripsAngularFireList.push(newTrip)
      .then(() => {
        if (this.filter) {
          this.filterTravels(this.filter);
        }
      })
      .catch(console.log);
  }

  emitFilterChange(): void {
    this.filterChange.next(this.trips);
  }

  filterTravels(filter: Filter): void {
    if (!filter) {
      console.error(`Invalid filter. Received: ${filter}`);
      return;
    }

    this.filter = filter;
    let trips = this.unfilteredTrips;

    if (filter.minimumPrice) {
      trips = trips.filter(trip => trip.price >= filter.minimumPrice);
    }

    if (filter.maximumPrice) {
      trips = trips.filter(trip => trip.price <= filter.maximumPrice);
    }

    if (filter.minimumRating) {
      trips = trips.filter(trip => trip.rating >= filter.minimumRating);
    }

    if (filter.maximumRating) {
      trips = trips.filter(trip => trip.rating <= filter.maximumRating);
    }

    const getDateWithoutTime = (date: Date) => date.setHours(0, 0, 0, 0);

    if (filter.startDate) {
      trips = trips.filter(trip =>
        getDateWithoutTime(trip.startDate) >= getDateWithoutTime(filter.startDate));
    }

    if (filter.endDate) {
      trips = trips.filter(trip =>
        getDateWithoutTime(trip.endDate) <= getDateWithoutTime(filter.endDate));
    }

    if (filter.destination) {
      trips = trips.filter(trip =>
        trip.destination.toLowerCase().includes(filter.destination.toLowerCase()));
    }

    this.trips = trips;
    this.emitFilterChange();
  }

  remove(key: string): void {
    this.tripsAngularFireList
      .remove(key)
      .catch(console.log);
  }

  updateComments(key: string, comment: Comment): Promise<void> {
    const trip = this.getByKey(key);
    const previousComments = trip.comments;
    const updatedComments = (previousComments && Array.isArray(previousComments))
      ? [...previousComments, comment]
      : [comment];

    return this.tripsAngularFireList.update(key + '/publicAccess', { comments: updatedComments });
  }

}
