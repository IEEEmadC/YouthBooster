import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FilterItemsPage } from '../pages/filter-items/filter-items';
import {SettingsPage} from "../pages/settings/settings";
import {TabsPage} from "../pages/tabs/tabs";
import {AdvancedSocialPage} from "../pages/AdvancedSocial/AdvancedSocial";
import { ProjectProvider } from '../providers/project/project';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SearchPipe } from '../pipes/search/search';

export const firebaseConfig = {

  apiKey: "AIzaSyBhUvfoOtNDdd4MKCUdzC9PLm3AFPfptSo",
  authDomain: "youthboo-22ad5.firebaseapp.com",
  databaseURL: "https://youthboo-22ad5.firebaseio.com",
  projectId: "youthboo-22ad5",
  storageBucket: "youthboo-22ad5.appspot.com",
  messagingSenderId: "7456543972"

};



@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    TabsPage,
    AdvancedSocialPage,
    SearchPipe,
    FilterItemsPage
  ],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    TabsPage,
    AdvancedSocialPage,
    FilterItemsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectProvider
  ]
})
export class AppModule {}
