
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {

  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            //this.firebaseService.unsubscribeOnLogOut();
            // this.firebaseService.providerId;
            console.log("logeed out!");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  get authenticated(): boolean {
    return this.user !== null;
  }
}

