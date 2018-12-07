import { DetailsPage } from './../pages/details/details';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthserviceProvider } from './../providers/authservice/authservice';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DetailsPage;

  private auth: AuthserviceProvider;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // check if user logged in on app load
    /* 
    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = OnboardingScreenPage;
          }
        },
        () => {
          this.rootPage = OnboardingScreenPage;
        }
      );
    */
  }
}

