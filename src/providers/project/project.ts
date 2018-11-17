
import { Injectable } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { FilterItemsPage } from '../../pages/filter-items/filter-items';
@Injectable()
export class ProjectProvider {


constructor(private fdb: AngularFireDatabase){


}
originalProjects: any;
projects: any;
kar : any;
searchTerm : any="";





load(){

this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {
      this.projects = data;
      this.originalProjects = data;


    },(err)=>{ console.log("probleme : ", err) });

}
accessProject(project){

  let newViews=project['views']+1;

  this.fdb.list("/myprojects/name").update(project['id'],{

  views : newViews

});
// go to the project page
}

addProject(){

  let id=this.projects.length.toString();
  //open another page of creating page
  this.fdb.list("/myprojects/name").set(id,{

profilname : 'ahmed ben',
projectname : 'Flying Car',
time : '04/01/2019',   //"dd/MM/yyyy"
profilepic : 'assets/imgs/marty-avatar.png',
projectpic : 'assets/imgs/advance-card-bttf.png',
likes : 20,
views : 1000,
comments : 60,
description : 'this is a flying car prototype',
id : id,
tags : ['software','hardware']
});

}

filterProject(){
// filter project by tags or sort the project

//filter by tag name
this.projects=this.projects.filter((project)=>{
  return project.tags.includes('hardware');
})

}

likeProject(project){  //like project and add it in likes section

  let newLikes=project['likes']+1;

  this.fdb.list("/myprojects/name").update(project['id'],{

  likes : newLikes

});

}

}
