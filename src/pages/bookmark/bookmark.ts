import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';
/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase) {
  }

 projects: any;
 fakeUsers: Array<any> = new Array(8);
   nolikes :boolean = false;





  ionViewDidLoad() {
    console.log('ionViewDidLoad BookmarkPage');
    setTimeout(() => {

    this.fdb.list("/myprojects/profileid/likes").valueChanges().subscribe((data) => {

        this.projects = data;
        if(this.projects.length==0)
         this.nolikes=true;
    },(err)=>{ console.log("probleme : ", err); });
  },500);
  }


  addProject(){

    let id=this.projects.length.toString();
    //open another page of creating page
    this.fdb.list("/myprojects/name").set(id,{

  profilname : 'ahmed ben',
  projectname : 'Robotic Car',
  time : '03/02/2018',   //"dd/MM/yyyy"
  profilepic : 'assets/imgs/marty-avatar.png',
  projectpic : 'assets/imgs/advance-card-bttf.png',
  likes : 10,
  views : 15,
  comments : 70,
  description : 'this is a flying car prototype',
  id : id,
  tags : ['software','hardware']
  });

  }
   // view the entire project
  accessProject(project){

    let newViews=project['views']+1;

    this.fdb.list("/myprojects/name").update(project['id'],{
    views : newViews
  });

  }


dislikeProject(project){
  console.log("it's removed");

 let newLikes=project['likes']-1;

 this.fdb.list("/myprojects/name").update(project['id'],{
   likes : newLikes
   });

  this.fdb.list("/myprojects/profileid/likes").remove(project['id']);



}

}
