import { Comment } from '../_models/comment';

interface TripAngularFire {
  key: string;
  rating: number;
  id: number;
  name: string;
  price: number;
  destination: string;
  description: string;
  startDate: number;
  endDate: number;
  currentPeopleCount: number;
  maxPeopleCount: number;
  photoUrl: string;
  comments: Comment[];
}

export { TripAngularFire };
