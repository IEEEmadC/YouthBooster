import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterItemsPage } from './filter-items';

@NgModule({
  declarations: [
    FilterItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterItemsPage),
  ],
})
export class FilterItemsPageModule {}
