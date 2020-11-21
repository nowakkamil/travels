interface Trip {
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
}

export { Trip };
