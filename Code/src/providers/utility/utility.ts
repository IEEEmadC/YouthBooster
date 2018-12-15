import { Commentaire } from '../../modals/comment.modal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {



  comments : any [] = [];
  projects = [];
  filtercateg = 'none';
  messages: any;
  likeState = [];
  projectID: string = "";
  currentUser = 'DbuWTni47ZAkllESplv';
  currentpictureUrl = "https://firebasestorage.googleapis.com/v0/b/youth-booster.appspot.com/o/profiles%2Findex.png?alt=media&token=4ef3ca76-28fe-42f5-b9a5-e10266470f34";
  currentfullName = " ";

  constructor(private fdb: AngularFireDatabase) {
  }

  // jack balvin
  // load method first method to be called


  load() {

    return this.fdb.list<any>("/comments/");
      
      
  }

}

