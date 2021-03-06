import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrowseProjectsPage } from "../browse-projects/browse-projects";


@IonicPage()
@Component({
  selector: 'page-filter-items',
  templateUrl: 'filter-items.html',
})
export class FilterItemsPage {

  PassedFilteredItems: any;

  constructor(private navCtrl: NavController, public navParams: NavParams) {
    this.PassedFilteredItems = this.navParams.get('projects');
    console.log(this.PassedFilteredItems);
  }


  filter(item) {

    this.PassedFilteredItems = this.sortByKey(this.PassedFilteredItems, item);

    this.navCtrl.setRoot(BrowseProjectsPage, { 'projects': this.PassedFilteredItems, 'filter': item });
  }


          public   sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x, y;
      var parts1, parts2, atime, btime;

      if ((key == 'likes') || (key == 'views')) {
        x = a[key];
        y = b[key];
      }
      else if ((key == 'newest') || (key == 'oldest')) {
        atime = new Date(a['timestamp']);
        btime = new Date(b['timestamp']);
        atime = atime.getFullYear() + "/" + atime.getMonth() + "/" + atime.getDate();
        btime = btime.getFullYear() + "/" + btime.getMonth() + "/" + btime.getDate();

        parts1 = atime.split("/");
        parts2 = btime.split("/");
        y = new Date(parts1[2], parts1[1], parts1[0]);
        x = new Date(parts2[2], parts2[1], parts2[0]);

      }
      if (key == 'oldest')
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
      else
        return ((x > y) ? -1 : ((x < y) ? 0 : 1));
    });

      }
}
