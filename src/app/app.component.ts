import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {BrowseProjectsPage} from "../pages/browse-projects/browse-projects";
import {BookmarkPage} from "../pages/bookmark/bookmark";
import {TeamPage} from "../pages/team/team";

import {ArchivePage} from "../pages/archive/archive";
import { ProjectProvider } from '../providers/project/project';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage;
  pages: Array<{title: string, component: any,icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public projectProvider : ProjectProvider,public auth: AuthService) {

    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Team', component: TeamPage, icon: 'people' },
      { title: 'Bookmarks', component: BookmarkPage, icon: 'bookmarks' },
      { title: 'Archive', component: ArchivePage, icon: 'archive' },
      { title: 'Messages', component: BrowseProjectsPage, icon: 'chatbubbles' },
      { title: 'Settings', component: BrowseProjectsPage, icon: 'settings' }
    ];


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.auth.afAuth.authState
          .subscribe(
            user => {
              if (user) {
                console.log(user);
                this.rootPage = TabsPage;
              } else {
                this.rootPage = LoginPage;
              }
            },
            () => {
              this.rootPage = LoginPage;
            }
          );
  }




	login() {

		this.auth.signOut();
		this.nav.setRoot(LoginPage);
	}

	logout() {

		this.auth.signOut();
		this.nav.setRoot(TabsPage);
	}







  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



}
