import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import { formatDistance } from 'date-fns';

import { Trip } from '../../_models/trip';
import { Comment } from '../../_models/comment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  key: string;
  trip: Trip;
  photosUrls: Array<string>;
  data: Comment[] = [];
  submitting = false;
  inputValue = '';

  constructor(
    private authService: AuthService,
    private travelsService: TravelsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
    this.trip = this.travelsService.getByKey(this.key);
    this.photosUrls = Array(4)
      .fill(null)
      .map((_, index) => `https://picsum.photos/id/${Math.round(Math.random() * 20) + index}/400`);

    this.data = this.trip.comments;
  }

  async handleSubmit(): Promise<void> {
    this.submitting = true;
    const newContent = this.inputValue;
    this.inputValue = '';
    const userId = await this.authService.getUserId();
    const dateNow = Date.now();

    const newComment = Comment.fromInterface({
      authorId: userId,
      content: newContent,
      date: dateNow,
      displayTime: formatDistance(new Date(dateNow), new Date(dateNow))
    });

    this.travelsService
      .updateComments(this.trip.key, newComment)
      .then(() => {
        this.submitting = false;
        this.data = [...this.data, newComment];
      });
  }
}
