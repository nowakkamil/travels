import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';

import { Trip } from '../../_models/trip';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip;
  id: number;

  array = [1, 2, 3, 4];
  effect = 'scrollx';

  constructor(
    private travelsService: TravelsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.trip = this.travelsService.getById(this.id);
  }

}
