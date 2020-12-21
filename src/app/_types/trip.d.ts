import { Comment } from '../_models/comment';

interface Trip {
  rating: number;
  id: number;
  name: string;
  price: number;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  currentPeopleCount: number;
  maxPeopleCount: number;
  photoUrl: string;
  comments: Comment[];
}

export { Trip };
