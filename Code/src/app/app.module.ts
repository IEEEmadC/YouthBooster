import { Camera } from '@ionic-native/camera';
import { ProfilePage, AddSectionModal } from '../pages/profile/profile';
import { CommentsPage } from '../pages/comments/comments';
import { ImageGalleryPage } from '../pages/image-gallery/image-gallery';
import { Keyboard } from '@ionic-native/keyboard';
import { ModalContentPage, ModalTextContentPage } from '../pages/project-setup/project-setup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
import { ProjectsProvider } from '../providers/projects/project';
import { PictureUtils } from '../providers/firebase-service/firebase-service';
import { FileTransfer } from '@ionic-native/file-transfer';

import { FormsModule } from '@angular/forms';
import { FilterItemsPage } from '../pages/filter-items/filter-items';
import { TabsPage} from "../pages/tabs/tabs";
import { BrowseProjectsPage} from "../pages/browse-projects/browse-projects";
import { ProjectProvider } from '../providers/project/project';
import { SearchPipe } from '../pipes/search/search';
import { BookmarkPage} from "../pages/bookmark/bookmark";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamPage} from "../pages/team/team";
import { NotifPage} from "../pages/notif/notif";
import { ArchivePage} from "../pages/archive/archive";
import { ComponentsModule } from '../pages/components/components.module';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProvider } from '../providers/user/user';
import { UtilityProvider } from '../providers/utility/utility';

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
    OnboardingScreenPage,
    HomePage,
    ProjectSetupPage,
    ModalContentPage,
    ModalTextContentPage,
    MyApp,
    TabsPage,
    BrowseProjectsPage,
    SearchPipe,
    FilterItemsPage,
    BookmarkPage,
    TeamPage,
    DetailsPage,
    NewSectionModal,
    AddSectionModal,
    EditSectionModal,
    MapsSectionModal,
    ImageGalleryPage,
    CommentsPage,
    ProfilePage,
    NotifPage,
    ArchivePage,
    LoginPage,
    SignupPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
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
    TabsPage,
    BrowseProjectsPage,
    FilterItemsPage,
    BookmarkPage,
    TeamPage,
    NotifPage,
    ArchivePage,
    DetailsPage,
    NewSectionModal,
    AddSectionModal,
    EditSectionModal,
    MapsSectionModal,
    ImageGalleryPage,
    CommentsPage,
    ProfilePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    SearchPipe,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectProvider,
    PhotoViewer,
    AuthserviceProvider,
    ProjectProvider,
    ProjectsProvider,
    PictureUtils,
    AngularFireAuth,
    AuthService,
    EmailService,
    UserProvider,
    UtilityProvider
  ]
})
export class AppModule { }
