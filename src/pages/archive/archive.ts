import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";


@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fdb: AngularFireDatabase) {
  }

archive=[];
noArchive: boolean=false;
fakearchive: boolean=true;
fakeUsers: Array<any> = new Array(8);
userId: string="nothing";

  ionViewDidLoad() {

    console.log('ionViewDidLoad ArchivePage');

    this.fdb.list("/myprojects/name").valueChanges().subscribe((data) => {
       /* te5ou projects l user w tchouf closed wala le */


         data.forEach((element)=>{
          // if((element.closed)&&(element.author==userId))
           this.archive.push(element);
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
