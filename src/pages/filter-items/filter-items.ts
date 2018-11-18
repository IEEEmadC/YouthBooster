import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {AdvancedSocialPage} from "../AdvancedSocial/AdvancedSocial";

@IonicPage()
@Component({
  selector: 'page-filter-items',
  templateUrl: 'filter-items.html',
})
export class FilterItemsPage {

       PassedFilteredItems:any;
       itemsToFilterBy=[{item: 'sort by likes',filter: 'likes'},{item: 'sort by recent',filter: 'time'}];


        constructor(private navCtrl: NavController, public navParams: NavParams) {
           this.PassedFilteredItems = this.navParams.get('project');
           console.log(this.PassedFilteredItems);
         }


         filter(itemsToFilterBy,order){

                 this.PassedFilteredItems  = this.sortByKey( this.PassedFilteredItems ,itemsToFilterBy['filter'],order);

                   this.navCtrl.push(AdvancedSocialPage,{'projects': this.PassedFilteredItems,'filter' :order.concat(itemsToFilterBy['filter'])});
         }



         public sortByKey(array, key,order) {
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
