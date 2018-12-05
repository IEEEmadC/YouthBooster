import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase) {
  }

  noNotif: boolean = false;
  notifs: any;
  delete: boolean = false;

  enableDelete(){
  this.delete=!this.delete;
  }

addToTeam(){
console.log('added to team');
/* add user id to the team of the current user in firebase */
}

deleteNotif(){
console.log('notif deleted');
/* delete notif from firebase */
}

deleteAll(){
console.log('all deleted');
/* delete all notif from firebase */
}

  ionViewDidLoad() {

    console.log('ionViewDidLoad NotifPage');

    setTimeout(() => {
     /* charge all the notifs donations and member join from notif firebase */
    this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {

        this.notifs = data;
        if(this.notifs.length==0)
         this.noNotif=true;

    },(err)=>{ console.log("probleme : ", err); });
  },500);


  }
}
