import { Injectable } from '@angular/core';
import { Trip, TripInterface } from '../_models/trip';

import Trips from '../data/trips';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {

  trips = Trips;

  getAll(): Array<Trip> {
    return this.trips;
  }

  getById(id: number): Trip | undefined {
    return this.trips.find(trip => trip.id === id);
  }

  create(trip: TripInterface): void {
    this.trips.push(Trip.fromInterface(trip));
  }
}
