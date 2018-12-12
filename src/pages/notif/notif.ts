import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { ProjectProvider } from '../../providers/project/project';

@IonicPage()
@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase,public projectProvider : ProjectProvider) {
  }

  noNotif: boolean = false;
  notifs: any;
  delete: boolean = false;

  enableDelete(){
  this.delete=!this.delete;
  }

addToTeam(notif){
console.log('added to team  '+this.projectProvider.projectID );
/* add user id to the team of the current user in firebase */

this.fdb.list("/projects/"+this.projectProvider.projectID+"/joins").set(notif.notifRef,notif.notifRef);
this.fdb.list("/notifications").remove(notif.notifId);
}

deleteNotif(notif){
console.log('notif deleted');
this.fdb.list("/notifications").remove(notif.notifId);
/* delete notif from firebase */
}

deleteAll(){
console.log('all deleted');
this.fdb.list("/notifications").remove();
/* delete all notif from firebase */
}

accessProfile(notif){
  this.navCtrl.push(ProfilePage,{'profile' : this.projectProvider.users[notif.notifRef]})
}



  ionViewDidLoad() {

    console.log('ionViewDidLoad NotifPage');

    setTimeout(() => {
     /* charge all the notifs donations and member join from notif firebase */
    this.fdb.list("/notifications").valueChanges().subscribe((data) => {
      console.log(data);
      this.notifs = data.filter((element)=> {
      /*  console.log(JSON.stringify(element.notifTarget)==JSON.stringify(this.projectProvider.currentUser));
        console.log(JSON.stringify(element.notifTarget)+"  "+JSON.stringify(this.projectProvider.currentUser)); */
        return JSON.stringify(element.notifTarget)==JSON.stringify(this.projectProvider.currentUser);
       });
  console.log(this.notifs);

        if(this.notifs.length==0)
         this.noNotif=true;

    },(err)=>{ console.log("probleme : ", err); });
  },500);


  }
}
