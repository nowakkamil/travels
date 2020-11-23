import { Component } from '@angular/core';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Trip } from '../../_models/trip';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(private shoppingCartService: ShoppingCartService) { }

  get trips(): Array<{ trip: Trip, count: number }> {
    return this.shoppingCartService.selectedTrips;
  }

  get priceSummary(): number {
    return this.trips.reduce(this.accumulatePrice, 0);
  }

  accumulatePrice(accumulated: number, entry: { trip: Trip; count: number; }): number {
    return accumulated + entry.trip.price * entry.count;
  }
}
