import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TravelsService } from 'src/app/services/travels.service';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  const travelsServiceMock = {
    getAll: [{}],
    getAllPromise: () => of([{}])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [
        { provide: TravelsService, useValue: travelsServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
