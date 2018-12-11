
import { Component,ViewChild } from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
import { NavController, NavParams,Keyboard } from 'ionic-angular';
import { FilterItemsPage } from '../filter-items/filter-items';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'page-browse-projects',
  templateUrl: 'browse-projects.html',
  animations: [
  trigger('heart', [
          state('unliked', style({
            transform: 'scale(1,1)'
          })),
          state('liked', style({
            transform: 'scale(1.3,1.3)'
          })),
          transition('unliked <=> liked', animate('200ms ease-in-out'))
      ])]
})


export class BrowseProjectsPage {

   @ViewChild('myContent') content;

showSearch = false;

  constructor(public projectProvider : ProjectProvider,public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard)
   {
this.projectProvider.projects = this.navParams.get('projects');
console.log(this.navParams.get('chak'));
if(this.navParams.get('filter'))
this.projectProvider.filtercateg=this.navParams.get('filter');
    }

 fakeProjects: Array<any> = new Array(8);


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
