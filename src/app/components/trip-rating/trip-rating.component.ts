import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.scss']
})
export class TripRatingComponent {
  range = Array(5).fill(0).map((_, i) => i);

  @Input() rating = 0;
  @Output() rated = new EventEmitter<number>();

  setRating(rating: number): void {
    this.rating = rating;
    this.rated.emit(this.rating);
  }
}
