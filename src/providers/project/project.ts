
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class ProjectProvider {


constructor(private fdb: AngularFireDatabase){


}

projects=[];
filtercateg='none';
bookmarksprojects=[];
likeState= [];

// load method first method to be called
load(){

  if(!this.likeState)
  for(let i=0;i<10;i++)  // for icon like statue
     this.likeState.push('unliked');

this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {
    console.log("i updated the project"+"  filter categ "+this.filtercateg);

    this.projects = data;

  if(this.filtercateg!='none'){     // filter the  project after the update
   this.sortByKey(this.projects,this.filtercateg);
  }

       for(let i=this.likeState.length;i<data.length;i++)   // for icon like statue
          this.likeState.push('unliked');


},(err)=>{ console.log("probleme : ", err); });
               /*  tchargi men bookmarks datapage */
this.fdb.list("/myprojects/profileid/likes"/*+user id*/).valueChanges().subscribe((data) => {
this.bookmarksprojects=data;
this.bookmarksprojects.forEach((data) => {
  this.likeState[data.id]='liked';
});

console.log(this.bookmarksprojects);

},(err)=>{ console.log("probleme : ", err); });


}


// go to the project page  and add views
accessProject(project){
   //access page .push
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
profilid : 0,
profilname : 'ahmed ben',
projectname : 'Robotic Car',
time : '03/02/2018',   //"dd/MM/yyyy"
profilepic : 'assets/imgs/marty-avatar.png',
projectpic : 'https://firebasestorage.googleapis.com/v0/b/youth-booster.appspot.com/o/advance-card-bttf.png?alt=media&token=3258db68-bf8b-47d2-9d10-83bb6045d104',
likes : 10,
views : 15,
comments : 70,
description : 'this is a flying car prototype ',
id : id,
tags : ['software','hardware']
});

}

//like project and add it in likes section
likeProject(project)
{

  let bool=this.bookmarksprojects.some((element)=>{
  return JSON.stringify(element.id)===JSON.stringify(project.id);
    });

if((!bool)||(!this.bookmarksprojects))
{

  this.likeState[project.id] ='liked';
  let newLikes=project.likes+1;

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

  this.likeState[project.id] = 'unliked';
  let newLikes=project.likes-1;

  this.fdb.list("/myprojects/name").update(project['id'],{
    likes : newLikes
    });

   this.fdb.list("/myprojects/profileid/likes").remove(project['id']);

}

}


   // sort by key method ( time or likes or views )
    sortByKey(array, key) {
            return array.sort(function (a, b) {
             var x,y;
             var parts1,parts2;

                if((key=='likes')||(key=='views'))
                {
                 x = a[key];
                 y = b[key];
                }
                else if((key=='newest')||(key=='oldest'))
                {

                  parts1=a['time'].split("/");
                  parts2=b['time'].split("/");
                  x = new Date(parts1[2], parts1[1] - 1, parts1[0]);
                  y = new Date(parts2[2], parts2[1] - 1, parts2[0]);

                }
                if(key=='oldest')
                return ((x < y) ? -1 : ((x > y) ? 0 : 1));
                else
                return ((x > y) ? -1 : ((x < y) ? 0 : 1));
           });

       }
}
