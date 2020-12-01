interface Filter {
  minimumPrice: number;
  maximumPrice: number;
  startDate: Date;
  endDate: Date;
  minimumRating: number;
  maximumRating: number;
  destination: string;
}

export { Filter };
