import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { ProjectProvider } from '../../providers/project/project';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase,public projectProvider : ProjectProvider) {
  }

 mybookmarks=[];
 projects=[];
 fakeUsers: Array<any> = new Array(8);
   nolikes :boolean = false;


  ionViewDidLoad() {

        this.mybookmarks = this.projectProvider.bookmarks;
      //  this.mybookmarks= Array.from(Object.keys(this.mybookmarks[0]['projects']), k=>this.mybookmarks[0]['projects'][k]);

        console.log(this.mybookmarks);
        console.log(this.projectProvider.projects);
        if((!this.mybookmarks)||(this.mybookmarks.length==0))
         this.nolikes=true;

        this.projects=this.projectProvider.projects.filter((data)=>{

            return this.mybookmarks.indexOf(data.projectId.toString()) > -1;


        });
           console.log(this.projects);

  }


  addProject(){

  }
   // view the entire project
  accessProject(project){

    let newViews=project.views+1;

    this.fdb.list("/projects").update(project['id'],{
    views : newViews
  });

  }


dislikeProject(project){
  console.log("it's removed");
let index=this.projectProvider.bookmarks.findIndex((element)=>{return JSON.stringify(element)===JSON.stringify(project.projectId);});
 let newLikes=project.likes-1;

 this.fdb.list("/projects").update(project.projectId,{
   likes : newLikes
   });

this.fdb.list("/bookmarks/"+this.projectProvider.currentUser+"/projects").remove(index.toString());


}

}
