
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase,public projectProvider : ProjectProvider) {
  }

    noTeam :boolean = false;
    users: any[]=[];
    delete: boolean = false;


    accessProfile(profile){
      this.navCtrl.push(ProfilePage,{'profile' : this.projectProvider.users[profile]})
    }


  chatWithMember(profile){

  console.log("chat")
/*     create chat with user */
  }

  deleteMember(profile){

   this.fdb.list("/projects/"+this.projectProvider.projectID+"/joins").remove(profile);
  console.log("delete")
   /* delete member from team in firebase */
  }

  deleteAll(){
  this.fdb.list("/projects/"+this.projectProvider.projectID+"/joins").remove();
  console.log("delete all")
   /* delete all members of the team */
  }

  enableDelete(){
  this.delete=!this.delete;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad TeamPage');

    setTimeout(() => {

   this.fdb.list("/projects").valueChanges().subscribe((data) => {
               /* getting list of the team from user team firebase userid.team  of current project */
      let usersd= data.filter((element)=> {

        return JSON.stringify(element['author'])==JSON.stringify(this.projectProvider.currentUser);
       });
       if(usersd[0]['joins'])
       this.users= Array.from(Object.keys(usersd[0]['joins']), k=>usersd[0]['joins'][k]);
       console.log(this.users);
        if((!this.users)||(this.users.length==0))
         this.noTeam=true;

    },(err)=>{ console.log("probleme : ", err); });
  },500);


  }

}
