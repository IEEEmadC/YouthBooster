import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { ProjectProvider } from '../../providers/project/project';

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase,public projectProvider : ProjectProvider) {
  }

archive=[];
noArchive: boolean=false;
fakearchive: boolean=true;
fakeUsers: Array<any> = new Array(8);
userId: string="nothing";

  ionViewDidLoad() {

    console.log('ionViewDidLoad ArchivePage');

    this.fdb.list("/projects").valueChanges().subscribe((data) => {
       /* te5ou projects l user w tchouf closed wala le */
           if(data)
       this.archive=data.filter((element)=> {
             //console.log(element+"  "+element.author);
         return (JSON.stringify(element.author)==JSON.stringify(this.projectProvider.currentUser))&&JSON.stringify(element.closed);
        });

          setTimeout(()=>{
              this.fakearchive=false;
            if((!this.archive)||(this.archive.length==0))
             this.noArchive=true;

          },800);

    },(err)=>{ console.log("probleme : ", err); });


}



accessProject(project){

console.log('access project');

}








}
