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

  @Output() removed = new EventEmitter<number>();
  @Output() rated = new EventEmitter<{ id: number, rating: number }>();
  @Output() reserved = new EventEmitter<number>();
  @Output() unreserved = new EventEmitter<number>();

  onTripRated(rating: number): void {
    const data = {
      id: this.trip.id,
      rating
    };

    this.rated.emit(data);
  }

  onRemoveButtonClicked(): void {
    this.removed.emit(this.trip.id);
  }

  onReserveButtonClicked(): void {
    this.trip.reserve();
    this.reserved.emit(this.trip.id);
  }

  onUndoReserveButtonClicked(): void {
    this.trip.undoReserve();
    this.unreserved.emit(this.trip.id);
  }
}
