import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
  static lastId = 0;
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

  static fromInterface(data: TripInterface): Trip {
    const trip = new Trip(Trip.lastId + 1);

    trip.description = data.description;
    trip.destination = data.destination;
    trip.maxPeopleCount = data.maxPeopleCount;
    trip.name = data.name;
    trip.photoUrl = data.photoUrl;
    trip.price = data.price;
    trip.rating = data.rating;

    // TODO
    // trip.startDate = data.startDate;
    trip.startDate = new Date();
    // TODO
    // trip.endDate = data.endDate;
    trip.endDate = new Date();

    return trip;
  }

  constructor(id: number) {
    this.id = id;

    if (id > Trip.lastId) {
      Trip.lastId = id;
    }

    this.description = `Finest trip description (${id})`;
    this.destination = `Country #${id}`;
    this.name = `Name: '${id}'`;
    this.photoUrl = `https://picsum.photos/id/${id * 4 + 6}/200`;

    this.startDate = new Date();
    this.endDate = new Date();

    this.maxPeopleCount = id;
    this.currentPeopleCount = 0;

    this.rating = (id % 5) + 1;

    this.price = 1000 + id * 100 + 99;
  }

  get isEmpty(): boolean {
    return this.currentPeopleCount === 0;
  }

  get isFull(): boolean {
    return this.currentPeopleCount >= this.maxPeopleCount;
  }

  get lowAvailability(): boolean {
    return this.maxPeopleCount - this.currentPeopleCount < 2;
  }

  get startDateFormatted(): string {
    return this.startDate.toDateString();
  }

  get endDateFormatted(): string {
    return this.endDate.toDateString();
  }

  setRating(rating: number): void {
    this.rating = rating;
  }

  reserve(): void {
    if (this.currentPeopleCount >= this.maxPeopleCount) {
      return;
    }

    this.currentPeopleCount++;
  }

  undoReserve(): void {
    if (this.currentPeopleCount <= 0) {
      return;
    }

    this.currentPeopleCount--;
  }
}

export { Trip, TripInterface };
