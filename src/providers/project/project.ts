
import { Injectable } from '@angular/core';
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
bookmarksprojects: any;


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

this.fdb.list("/myprojects/profileid/likes").valueChanges().subscribe((data) => {
this.bookmarksprojects=data;
console.log(this.bookmarksprojects);
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

//like project and add it in likes section
likeProject(project)
{

  let bool=this.bookmarksprojects.some((element)=>{
  return JSON.stringify(element)===JSON.stringify(project);});

if((!bool)||(!this.bookmarksprojects))
{
  this.likesArr[project.id]=true;
  let newLikes=project['likes']+1;

  this.fdb.list("/myprojects/name").update(project['id'],{
    likes : newLikes
    });

   this.fdb.list("/myprojects/profileid/likes").set(project['id'],{profilname : project.profilname,
   projectname : project.projectname,
   time : project.time,   //"dd/MM/yyyy"
   profilepic : project.profilepic,
   projectpic : project.projectpic,
   likes : newLikes,
   views : project.views,
   comments : project.comments,
   description : project.description,
   id : project.id,
   tags : project.tags});

console.log("it's added");
}

else {
   console.log("it's removed");
  this.likesArr[project.id]=false;
  let newLikes=project['likes']-1;

  this.fdb.list("/myprojects/name").update(project['id'],{
    likes : newLikes
    });

   this.fdb.list("/myprojects/profileid/likes").remove(project['id']);

}

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
