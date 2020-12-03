import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import { formatDistance } from 'date-fns';

import { Trip } from '../../_models/trip';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  trip: Trip;
  id: number;
  photosUrls: Array<string>;
  time = formatDistance(new Date(), new Date());
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Test author',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  constructor(
    private travelsService: TravelsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.trip = this.travelsService.getById(this.id);
    this.photosUrls = Array(4)
      .fill(null)
      .map((_, index) => `https://picsum.photos/id/${this.id * 20 + index}/400`);
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        };
      });
    }, 800);
  }

}
