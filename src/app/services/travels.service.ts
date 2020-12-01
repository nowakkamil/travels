import { Filter as FilterInterface } from 'src/app/_types/filter';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip, TripInterface } from '../_models/trip';

import Trips from '../data/trips';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  trips = Trips;
  unfilteredTrips = Trips;
  filterChange = new Subject<Array<Trip>>();

  getAll(): Array<Trip> {
    return this.trips;
  }

  getById(id: number): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  create(trip: TripInterface): void {
    this.trips.push(Trip.fromInterface(trip));
  }

  emitFilterChange(): void {
    this.filterChange.next(this.trips);
  }

  filterTravels(filter: FilterInterface): void {
    if (!filter) {
      console.error(`Invalid filter. Received: ${filter}`);
      return;
    }

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
}
