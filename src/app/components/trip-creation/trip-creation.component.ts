import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Trip } from '../../_types/trip';

@Component({
  selector: 'app-trip-creation',
  templateUrl: './trip-creation.component.html',
  styleUrls: ['./trip-creation.component.scss']
})
export class TripCreationComponent implements OnInit {
  @Output() saved = new EventEmitter<Trip>();

  form: FormGroup;
  urlPlaceholder: string;

  name = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  endDate = new FormControl('', Validators.required);
  maxPeopleCount = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  photoUrl = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  rating = new FormControl('', Validators.required);

  isVisible = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.urlPlaceholder = `Leave empty to auto-generate`;

    this.form = this.builder.group({
      name: this.name,
      destination: this.destination,
      startDate: this.startDate,
      endDate: this.endDate,
      maxPeopleCount: this.maxPeopleCount,
      description: this.description,
      photoUrl: this.photoUrl,
      price: this.price,
      rating: this.rating
    });
  }

  onSubmit(): void {
    if (!this.form.value.photoUrl) {
      this.form.value.photoUrl = `https://picsum.photos/id/${Math.round(Math.random() * 500)}/448`;
    }
    this.saved.emit(this.form.value);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleSave(): void {
    this.onSubmit();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  setRating(rating: number): void {
    this.form.patchValue({ rating });
  }

}
