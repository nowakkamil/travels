import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Array<User>;
  usersAngularFireList: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.populateUsers();
  }

  populateUsers(): Observable<any[]> {
    this.usersAngularFireList = this.db.list<User>('/users');
    const promise = this.usersAngularFireList
      .snapshotChanges()
      .pipe(map(changes => changes.map(
        (c: { payload: { key: any; val: () => any; }; }) => ({ key: c.payload.key, ...c.payload.val() })))
      );

    promise.subscribe(
      response => {
        const users = Array.isArray(response)
          ? response.map(User.fromInterface)
          : [User.fromInterface(response)];

        console.log(response);
        console.log(users);

        this.users = users;
      }, err => console.log(err));

    return promise;
  }

  getAllPromise(): Observable<any[]> {
    return this.populateUsers();
  }

  getAll(): Array<User> {
    return this.users;
  }
}
