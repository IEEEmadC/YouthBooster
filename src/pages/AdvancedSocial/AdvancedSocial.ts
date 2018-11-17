
import { Component,ViewChild } from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
import { NavController, NavParams, PopoverController,Keyboard } from 'ionic-angular';
import { FilterItemsPage } from '../filter-items/filter-items';
@Component({
  selector: 'page-AdvancedSocial',
  templateUrl: 'AdvancedSocial.html',

})




export class AdvancedSocialPage {
   @ViewChild('kk') content;


showSearch = false;

  constructor(public projectProvider : ProjectProvider,public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard)
   {
this.projectProvider.projects = this.navParams.get('projects');
console.log(this.navParams.get('chak'));

    }
 fakeUsers: Array<any> = new Array(8);


 navigateFilter(){

   if(this.projectProvider.projects)
  this.navCtrl.push(FilterItemsPage,{'project': this.projectProvider.projects});

 }

ionViewDidLoad(){
  setTimeout(() => {
    if(!this.projectProvider.projects)
this.projectProvider.load();

//this.projectProvider.setFilteredItems();
},1000);}


// show/hide search bar
  openSearchBox() {

    this.showSearch = !this.showSearch;
    this.content.scrollToTop();
   
  }

 }
