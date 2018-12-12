import { Camera } from '@ionic-native/camera';
import { ProfilePage } from './../pages/profile/profile';
import { CommentsPage } from './../pages/comments/comments';
import { ImageGalleryPage } from './../pages/image-gallery/image-gallery';
import { Keyboard } from '@ionic-native/keyboard';
import { ModalContentPage, ModalTextContentPage } from '../pages/project-setup/project-setup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectSetupPage } from '../pages/project-setup/project-setup';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EmailComposer } from '@ionic-native/email-composer';

import { HttpModule } from '@angular/http';
import { YtProvider } from '../providers/yt/yt';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DetailsPage, NewSectionModal, EditSectionModal, MapsSectionModal } from '../pages/details/details';
import { DatePicker } from '@ionic-native/date-picker';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { OnboardingScreenPage } from '../pages/onboarding-screen/onboarding-screen';
import { environment } from '../environments/environment';
import { AuthserviceProvider } from '../providers/authservice/authservice';
import { ProjectProvider } from '../providers/project/project';
import { PictureUtils } from '../providers/firebase-service/firebase-service';
import { FileTransfer } from '@ionic-native/file-transfer';



@NgModule({
  declarations: [
    MyApp,
    OnboardingScreenPage,
    HomePage,
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage,
    DetailsPage,
    NewSectionModal,
    EditSectionModal,
    MapsSectionModal,
    ImageGalleryPage,
    CommentsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/realtime database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OnboardingScreenPage,
    HomePage,
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage,
    DetailsPage,
    NewSectionModal,
    EditSectionModal,
    MapsSectionModal,
    ImageGalleryPage,
    CommentsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    EmailComposer,
    InAppBrowser,
    DatePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileChooser,
    ImagePicker,
    IOSFilePicker,
    Camera,
    Crop,
    FileTransfer,
    FilePath,
    YtProvider,
    YoutubeVideoPlayer,
    PhotoViewer,
    AuthserviceProvider,
    ProjectProvider,
    PictureUtils
  ]
})
export class AppModule { }
