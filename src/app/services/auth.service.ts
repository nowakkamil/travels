import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Credentials {
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly authState$: Observable<firebase.User | null> = this.firebaseAuth.authState;
  constructor(private firebaseAuth: AngularFireAuth) { }

  get user(): Observable<firebase.User | null> {
    return this.firebaseAuth.user;
  }

  async isAdmin(): Promise<boolean> {
    const user = await this.getUserPromise();
    return environment.adminId === user.uid;
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getUserPromise();
    return user ? true : false;
  }

  async getUserEmail(): Promise<string> {
    const user = await this.getUserPromise();
    return user.email;
  }

  getUserPromise(): Promise<firebase.User | null> {
    return this.firebaseAuth.authState.pipe(first()).toPromise();
  }

  login({ email, password }: Credentials): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  register({ email, password }: Credentials): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.firebaseAuth.signOut();
  }

}
