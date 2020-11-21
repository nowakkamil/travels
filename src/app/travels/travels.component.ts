import { Component } from '@angular/core';

import { Trip } from '../_models/trip';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent {
  trips: Array<Trip> = [
    new Trip(1),
    new Trip(2),
    new Trip(3),
    new Trip(4),
    new Trip(5),
    new Trip(6),
    new Trip(7),
    new Trip(8),
  ];

  get bookedTripsCount(): number {
    return this.trips.reduce(this.accumulateTripsCount, 0);
  }

  get maxPriceId(): number {
    return this.trips.reduce(this.tripWithHigherPrice).id;
  }

  get minPriceId(): number {
    return this.trips.reduce(this.tripWithLowerPrice).id;
  }

  accumulateTripsCount(accumulated: number, current: Trip): number {
    return accumulated + current.currentPeopleCount;
  }

  tripWithLowerPrice(x: Trip, y: Trip): Trip {
    return x.price < y.price
      ? x
      : y;
  }

  tripWithHigherPrice(x: Trip, y: Trip): Trip {
    return x.price > y.price
      ? x
      : y;
  }
}
