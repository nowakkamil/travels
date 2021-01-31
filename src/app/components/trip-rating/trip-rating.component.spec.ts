import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRatingComponent } from './trip-rating.component';

describe('TripRatingComponent', () => {
  let component: TripRatingComponent;
  let fixture: ComponentFixture<TripRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripRatingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when setRating is called', () => {
    const ratingNumber = 4;
    spyOn(component.rated, 'emit');

    fixture.componentInstance.setRating(ratingNumber);
    fixture.detectChanges();

    expect(component.rated.emit).toHaveBeenCalledWith(ratingNumber);
  });
});
