import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage, NewSectionModal, EditSectionModal } from './details';

@NgModule({
  declarations: [
    DetailsPage,
    NewSectionModal,
    EditSectionModal
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
  ],
})
export class DetailsPageModule {}
