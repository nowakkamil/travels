import { TripAngularFire as TripAngularFireInterface } from '../_types/trip-angular-fire';
import { TripInterface } from './trip';

class TripAngularFire implements TripAngularFireInterface {
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

  static fromInterface(data: TripInterface): TripAngularFire {
    const trip = new TripAngularFire();

    trip.description = data.description;
    trip.destination = data.destination;
    trip.maxPeopleCount = data.maxPeopleCount;
    trip.name = data.name;
    trip.photoUrl = data.photoUrl;
    trip.price = data.price;
    trip.rating = data.rating;
    trip.startDate = new Date(data.startDate).getTime();
    trip.endDate = new Date(data.endDate).getTime();

    return trip;
  }

}

export { TripAngularFire, TripAngularFireInterface };
