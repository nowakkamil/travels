import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreationComponent } from './trip-creation.component';

describe('TripCreationComponent', () => {
  let component: TripCreationComponent;
  let fixture: ComponentFixture<TripCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
