import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { FilterItemsPage } from '../pages/filter-items/filter-items';
import {TabsPage} from "../pages/tabs/tabs";
import {BrowseProjectsPage} from "../pages/browse-projects/browse-projects";
import { ProjectProvider } from '../providers/project/project';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SearchPipe } from '../pipes/search/search';
import {BookmarkPage} from "../pages/bookmark/bookmark";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TeamPage} from "../pages/team/team";
import {NotifPage} from "../pages/notif/notif";
import {ArchivePage} from "../pages/archive/archive";
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { HttpModule } from '@angular/http';
import { ComponentsModule } from '../pages/components/components.module';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireAuth } from '@angular/fire/auth';


export const firebaseConfig = {

  apiKey: "AIzaSyBDdaWIh6iS5SNbdtT1iXFtQ-DLFV4625E",
  authDomain: "youth-booster.firebaseapp.com",
  databaseURL: "https://youth-booster.firebaseio.com",
  projectId: "youth-booster",
  storageBucket: "youth-booster.appspot.com",
  messagingSenderId: "358028150171"


};



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    BrowseProjectsPage,
    SearchPipe,
    FilterItemsPage,
    BookmarkPage,
    TeamPage,
    NotifPage,
    ArchivePage,
    LoginPage,
		SignupPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ComponentsModule,
    HttpModule,
    NgxErrorsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    BrowseProjectsPage,
    FilterItemsPage,
    BookmarkPage,
    TeamPage,
    NotifPage,
    ArchivePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectProvider,
    AngularFireAuth,
		AuthService,
    EmailService

  ]
})
export class AppModule {}
