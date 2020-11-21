import { Trip as TripInterface } from '../_types/trip';

class Trip implements TripInterface {
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

  constructor(id: number) {
    this.id = id;
    this.description = `Finest trip description (${id})`;
    this.destination = `Country #${id}`;
    this.name = `Name: '${id}'`;
    this.photoUrl = 'https://via.placeholder.com/100x100';

    this.startDate = new Date();
    this.endDate = new Date();

    this.maxPeopleCount = id;
    this.currentPeopleCount = 0;

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
