
import { Injectable } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectProvider {


constructor(private fdb: AngularFireDatabase){


}
originalProjects: any;
projects: any;
likesArr : any  = [];
filtercateg='none';



// load method first method to be called
load(){

this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {
    console.log("i updated the project"+"  filter categ "+this.filtercateg);

    this.projects = data;


  if(this.filtercateg!='none'){     // filter the  project after the update
   this.sortByKey(this.projects,this.filtercateg.substring(2),this.filtercateg.substring(0,2));
  }

       for(let i=0;i<data.length;i++)   // for icon like statue
        this.likesArr.push(false);

},(err)=>{ console.log("probleme : ", err); });

}


// go to the project page  and add views
accessProject(project){

  let newViews=project['views']+1;

  this.fdb.list("/myprojects/name").update(project['id'],{
  views : newViews
});

}

// open another page of project form
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

//like project and add it in likes section
likeProject(project)
{
  this.likesArr[project.id]=!this.likesArr[project.id];
  /*
   if (profile.id.like)
   newLikes=project['likes']+1;
   else
   newLikes=project['likes']-1;
  */
  let newLikes=project['likes']+1;

  this.fdb.list("/myprojects/name").update(project['id'],{

  likes : newLikes

});

}


   // sort by key method ( time or likes )
  sortByKey(array, key,order) {
          console.log("here i sort "+key+"  "+order);
         return array.sort(function (a, b) {
          var x,y;
          var parts1,parts2;

             if(key=='likes')
             {
              x = a[key];
              y = b[key];
             }
             else if(key=='time')
             {parts1=a[key].split("/");
              parts2=b[key].split("/");
               x = new Date(parts1[2], parts1[1] - 1, parts1[0]);
               y = new Date(parts2[2], parts2[1] - 1, parts2[0]);

             }
             if(order=='As')
             return ((x < y) ? -1 : ((x > y) ? 0 : 1));
             else
             return ((x > y) ? -1 : ((x < y) ? 0 : 1));
        });

    }
}
