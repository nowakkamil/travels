import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';

export interface Credentials {
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {

  readonly authState$: Observable<firebase.User | null> = this.firebaseAuth.authState;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

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

  register({ email, password, userName }): Promise<firebase.auth.UserCredential> {
    const registrationPromise = this.firebaseAuth.createUserWithEmailAndPassword(email, password);

    registrationPromise.then(user => {
      const userData = { email, userName };
      this.db.database.ref('/users').child(user.user.uid).set(userData);
      return user;
    });

    return registrationPromise;
  }

  signOut(): Promise<void> {
    return this.firebaseAuth.signOut();
  }

}
