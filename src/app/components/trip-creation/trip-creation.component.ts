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

  name = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  endDate = new FormControl('', Validators.required);
  maxPeopleCount = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  photoUrl = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name: this.name,
      destination: this.destination,
      startDate: this.startDate,
      endDate: this.endDate,
      maxPeopleCount: this.maxPeopleCount,
      description: this.description,
      photoUrl: this.photoUrl,
      price: this.price
    });
  }

  onSubmit(): void {
    this.saved.emit(this.form.value);
  }
}
