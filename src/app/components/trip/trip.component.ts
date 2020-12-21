import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Trip } from '../../_models/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent {
  @Input() isHighest: boolean;
  @Input() isLowest: boolean;
  @Input() trip: Trip;
  @Input() isAdmin: boolean;

  @Output() removed = new EventEmitter<string>();
  @Output() rated = new EventEmitter<{ key: string, rating: number }>();
  @Output() reserved = new EventEmitter<number>();
  @Output() unreserved = new EventEmitter<number>();

  onTripRated(rating: number): void {
    const data = {
      key: this.trip.key,
      rating
    };

    this.rated.emit(data);
  }

  onRemoveButtonClicked(): void {
    this.removed.emit(this.trip.key);
  }

  onReserveButtonClicked(): void {
    if (this.trip.isFull) {
      return;
    }

    this.trip.reserve();
    this.reserved.emit(this.trip.id);
  }

  onUndoReserveButtonClicked(): void {
    if (this.trip.isEmpty) {
      return;
    }

    this.trip.undoReserve();
    this.unreserved.emit(this.trip.id);
  }
}
