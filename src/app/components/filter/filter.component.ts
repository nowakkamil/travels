import { Component, ViewChild } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { TravelsService } from 'src/app/services/travels.service';
import { Filter as FilterInterface } from 'src/app/_types/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements FilterInterface {

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  minimumPrice: number;
  maximumPrice: number;
  prices: NzMarks;

  startDate: Date;
  endDate: Date;

  minimumRating: number;
  maximumRating: number;

  destination: string;

  constructor(
    private travelsService: TravelsService
  ) {
    this.minimumPrice = 1;
    this.maximumPrice = 10000;

    this.prices = {
      1: '1$',
      10000: '10000$'
    };
  }

  disabledStartDate = (startDate: Date): boolean => {
    if (!startDate || !this.endDate) {
      return false;
    }
    return startDate.getTime() > this.endDate.getTime();
  }

  disabledEndDate = (endDate: Date): boolean => {
    if (!endDate || !this.startDate) {
      return false;
    }
    return endDate.getTime() <= this.startDate.getTime();
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  setMinimumRating(minimumRating: number): void {
    this.minimumRating = minimumRating;
  }

  setMaximumRating(maximumRating: number): void {
    this.maximumRating = maximumRating;
  }

  setPrice(modelChange: number[]): void {
    if (!Array.isArray(modelChange)) {
      console.error(`Setting price can not succeed if array of NzMarks is not passed. Received: ${modelChange}`);
      return;
    }

    this.minimumPrice = modelChange[0];
    this.maximumPrice = modelChange[1];
  }

  filterTravels(): void {
    this.travelsService.filterTravels({...this});
  }

}
