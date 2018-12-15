import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { User } from '../../modals/user.modal';

/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private usersRef = this.db.list<User>('users');

  constructor(private db:AngularFireDatabase) {}

  getAllUsers() {
    return this.usersRef;
  }

  addUser(user:User) {
    return this.usersRef.push(user);
  }

  getUser(pid:string) {
    let singleUserRef = this.db.object<User>('users/' + pid);
    return singleUserRef;
  }

  editUser(user:User) {
    return this.usersRef.update(user.key, user);
  }
}
