import { Component, ViewChild } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  minimumRating: number;
  maximumRating: number;

  startDate: Date | null = null;
  endDate: Date | null = null;

  destination: string;

  minimumPrice: 0;
  maximumPrice: 10000;
  startMark: number;
  endMark: number;

  marks: NzMarks = {
    1: '1$',
    10000: '10000$'
  };

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

}
