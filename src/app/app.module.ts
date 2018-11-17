import { Keyboard } from '@ionic-native/keyboard';
import { ModalContentPage, ModalTextContentPage } from '../pages/project-setup/project-setup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectSetupPage } from '../pages/project-setup/project-setup';

import { EmailComposer } from '@ionic-native/email-composer';

import { HttpModule } from '@angular/http';
import { YtProvider } from '../providers/yt/yt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    EmailComposer,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileChooser,
    //FileUploadOptions,
    FilePath,
    YtProvider,
    YoutubeVideoPlayer
  ]
})
export class AppModule {}
