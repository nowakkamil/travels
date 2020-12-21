import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Travels';
  user: firebase.User | null;
  userName: string;
  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService) {
    this.authService.isLoggedIn().then(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.isAdmin().then(isAdmin => this.isAdmin = isAdmin);
    this.authService.getUserEmail().then(userEmail => {
      this.userName = userEmail.split('@')[0];
    });
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => this.router.navigateByUrl('/auth'))
      .then(() => window.location.reload())
      .then(() => this.message.create('success', 'Successfully signed out'))
      .catch(() => this.message.create('error', `'Couldn't sign out. Try again`));
  }
}
