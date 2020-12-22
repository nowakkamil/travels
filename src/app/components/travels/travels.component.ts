import { Component, OnInit } from '@angular/core';

import { Trip } from '../../_models/trip';
import { TravelsService } from '../../services/travels.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {
  trips: Array<Trip> = [];
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private travelsService: TravelsService,
    private shoppingCartService: ShoppingCartService) {
    this.authService.isAdmin().then(result => this.isAdmin = result);
  }

  ngOnInit(): void {
    this.loadTrips();
    this.travelsService.filterChange.subscribe(trips => this.trips = trips);
  }

  loadTrips(): void {
    this.trips = this.travelsService.getAll();
  }

  get bookedTripsCount(): number {
    return this.trips.reduce(this.accumulateTripsCount, 0);
  }

  get maxPriceKey(): string {
    return this.trips.reduce(this.tripWithHigherPrice).key;
  }

  get minPriceKey(): string {
    return this.trips.reduce(this.tripWithLowerPrice).key;
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

  onTripReserved(key: string): void {
    this.shoppingCartService.select(this.trips.find(trip => trip.key === key));
  }

  onTripUnreserved(key: string): void {
    this.shoppingCartService.unselect(this.trips.find(trip => trip.key === key));
  }

  onTripRated(data: { key: string, rating: number }): void {
    const entry = this.trips.find(trip => trip.key === data.key);
    entry?.setRating(data.rating);
  }

  onTripRemoved(key: string): void {
    this.travelsService.remove(key);
  }

  onTripSaved(data: Trip): void {
    this.travelsService.create(data);
  }

}
