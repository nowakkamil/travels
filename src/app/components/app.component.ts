import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Travels';
  user: firebase.User | null;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.setIsLoggedIn();
  }

  async setIsLoggedIn(): Promise<void> {
    const user = await this.authService.isLoggedIn();
    this.isLoggedIn = user ? true : false;
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => this.router.navigateByUrl('/auth'))
      .then(() => window.location.reload())
      .then(() => this.message.create('success', 'Successfully signed out'))
      .catch(() => this.message.create('error', `'Couldn't sign out. Try again`));
  }
}
