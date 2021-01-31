import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '../services/auth.service';

describe('AppComponent', () => {
  const authServiceSpy = jasmine.createSpyObj({
    isLoggedIn: new Promise<boolean>(res => res(true)),
    isAdmin: new Promise<boolean>(res => res(true)),
    getUserEmail: new Promise<string>(res => res('test mail')),
    signOut: new Promise<void>(res => res())
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, OverlayModule
      ],
      providers: [
        NzMessageService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should invoke method to sign out of the authentication service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.signOut();
    expect(authServiceSpy.signOut).toHaveBeenCalled();
  });

  it(`should have as title 'Travels'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Travels');
  });
});
