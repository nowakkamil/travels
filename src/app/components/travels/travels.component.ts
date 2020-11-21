import { Component, OnInit } from '@angular/core';

import { Trip } from '../../_models/trip';
import { TravelsService } from '../../services/travels.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {
  trips: Array<Trip> = [];

  constructor(
    private travelsService: TravelsService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.trips = this.travelsService.getAll();
  }

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
