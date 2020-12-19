import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs/index';
import { first } from 'rxjs/operators';

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

  isLoggedIn(): Promise<firebase.User | null> {
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
