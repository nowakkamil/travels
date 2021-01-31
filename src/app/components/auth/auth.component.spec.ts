import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  const authServiceSpy = jasmine.createSpyObj({
    isLoggedIn: new Promise<boolean>(res => res(true)),
    isAdmin: new Promise<boolean>(res => res(true)),
    getUserEmail: new Promise<string>(res => res('test mail'))
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
