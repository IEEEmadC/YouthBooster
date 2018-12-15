import { BookmarkPage } from '../bookmark/bookmark';
import { FilterItemsPage } from '../filter-items/filter-items';
import { BrowseProjectsPage } from '../browse-projects/browse-projects';
import { TabsPage } from '../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  categories = ["Category_0","Category_1","Category_2","Category_3"];
  categoryNames = ["Categories","Science","Technology","Health & Bio"];
  subCategoryNames = ["All","Fiction","Innovas","Daily"];

  category = "All";

  showSearch = false;

  constructor(public navCtrl: NavController, public keyboard: Keyboard) {

  }


  // to implement
  addFavorite(id) {

  }

  // to implement:: filter page
  openGenres() {
    this.navCtrl.push(FilterItemsPage);
  }

  // open favorites page
  openFavorites(){
    this.navCtrl.push(BookmarkPage)
  }

  // navigate to project form page
  browse(category){
    this.navCtrl.setRoot(TabsPage);
  }

  // show/hide search bar
  openSearchBox() {
    this.showSearch = !this.showSearch;
    this.content.scrollToTop();
  }

  // to implement project search
  search(term) {
    let search_term = term;
//    this.keyboard.close();
    this.category = search_term;
    this.showSearch = false;
//    this._data.searchProjects(search_term)
//      .subscribe(res => this.projects = res);
  }

}
