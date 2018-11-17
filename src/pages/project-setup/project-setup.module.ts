import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectSetupPage, ModalContentPage, ModalTextContentPage } from './project-setup';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage,
    InAppBrowser,
    Keyboard
  ],
  imports: [
    IonicPageModule.forChild(ProjectSetupPage),
  ],
})
export class ProjectSetupPageModule {}
