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

  filter(minPrice: number): Array<Trip> {
    if (!minPrice) {
      console.error('Invalid minPrice');
      return this.trips;
    }

    this.trips = this.unfilteredTrips.filter(trip => trip.price >= minPrice);
    console.log(this.trips);
    this.emitFilterChange();
    return this.trips;
  }
}
