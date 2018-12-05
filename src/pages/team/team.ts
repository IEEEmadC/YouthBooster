import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase) {
  }

    noTeam :boolean = false;
    users: any;
    delete: boolean = false;


  accessMemberProfile(profile){

  console.log("profile")
  /*     navigate to profile of user */
  }

  chatWithMember(profile){

  console.log("chat")
/*     create chat with user */
  }

  deleteMember(profile){

  console.log("delete")
   /* delete member from team in firebase */
  }

  deleteAll(){

  console.log("delete all")
   /* delete all members of the team */
  }

  enableDelete(){
  this.delete=!this.delete;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TeamPage');

    setTimeout(() => {

    this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {
               /* getting list of the team from user team firebase userid.team */
        this.users = data;
        if(this.users.length==0)
         this.noTeam=true;

    },(err)=>{ console.log("probleme : ", err); });
  },500);


  }

}
