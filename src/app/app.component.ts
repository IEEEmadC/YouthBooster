import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {AdvancedSocialPage} from "../pages/AdvancedSocial/AdvancedSocial";
import {BookmarkPage} from "../pages/bookmark/bookmark";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Bookmarks', component: BookmarkPage, icon: 'bookmarks' },
      { title: 'Archive', component: AdvancedSocialPage, icon: 'archive' },
      { title: 'Messages', component: AdvancedSocialPage, icon: 'chatbubbles' },
      { title: 'Settings', component: AdvancedSocialPage, icon: 'settings' },
      { title: 'Sign out', component: AdvancedSocialPage, icon: 'log-out' }
    ];


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



}
