import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from 'src/app/services/travels.service';
import { formatDistance } from 'date-fns';

import { Trip } from '../../_models/trip';
import { Comment } from '../../_models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  key: string;
  trip: Trip;
  users: User[];
  photosUrls: Array<string>;
  data: Comment[] = [];
  submitting = false;
  inputValue = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private travelsService: TravelsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usersService.getAllPromise().subscribe(users => {
      this.users = users;
    });
    this.key = this.route.snapshot.paramMap.get('key');
    this.travelsService.getAllPromise().subscribe(trips => {
      if (!this.key) {
        console.error(`Can not attempt to find the trips based on invalid value of key: ${this.key}`);
        return;
      }

      const tripFromResponse = trips.find(trip => trip.key === this.key);
      if (!tripFromResponse) {
        console.error(`Couldn't find the trip of key: ${this.key}`);
        return;
      }

      this.trip = tripFromResponse.publicAccess && tripFromResponse.publicAccess.comments
        ? Trip.fromAngularInterface(tripFromResponse, tripFromResponse.publicAccess.comments)
        : Trip.fromAngularInterface(tripFromResponse, []);
      this.data = this.mapToUsername(this.trip.comments);
    });
    this.photosUrls = Array(4)
      .fill(null)
      .map((_, index) => `https://picsum.photos/id/${Math.round(Math.random() * 20) + index}/400`);
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
        this.data = this.mapToUsername([...this.data]);
      });
  }

  mapToUsername(comments: Comment[]): Comment[] {
    return comments.map(comment => {
      const user = this.users.find(u => u.key === comment.authorId);
      if (!user) {
        return comment;
      }

      return Comment.fromInterface({
        authorId: user.userName,
        content: comment.content,
        date: comment.date,
        displayTime: comment.displayTime
      });
    });
  }
}
