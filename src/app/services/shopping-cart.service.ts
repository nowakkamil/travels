import { Injectable } from '@angular/core';
import { Trip } from '../_models/trip';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  selectedTrips: Array<{ trip: Trip, count: number }> = [];

  select(trip: Trip): void {
    const entry = this.selectedTrips.find(e => e.trip.key === trip.key);

    if (entry) {
      entry.count++;
    } else {
      this.selectedTrips.push({
        trip,
        count: 1
      });
    }
  }

  unselect(trip: Trip): void {
    const entry = this.selectedTrips.find(e => e.trip.key === trip.key);

    if (entry) {
      entry.count--;
    }

    if (entry.count === 0) {
      this.selectedTrips = this.selectedTrips.filter(e => e.trip.key !== trip.key);
    }
  }
}
