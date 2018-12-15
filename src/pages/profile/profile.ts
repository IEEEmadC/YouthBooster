import { Commentaire } from './../../modals/comment.modal';
import { UtilityProvider } from './../../providers/utility/utility';
import { AuthService } from './../../services/auth.service';
import { User } from './../../modals/user.modal';
import { Project } from './../../modals/project.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, ActionSheetController, LoadingController, ToastController, ModalController, Keyboard, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators';
import { ProjectProvider } from '../../providers/project/project';
import { AngularFireList } from 'angularfire2/database';
import { FilePath } from '@ionic-native/file-path';
import { EmailComposer } from '@ionic-native/email-composer';
import { PictureUtils } from '../../providers/firebase-service/firebase-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  // profile object returned 
  /*
  user = {
    contacts_key: [
      'github',
      'googleplus',
      'linkedin',
      'youtube',
      'facebook'
    ],
    contacts: [
      "someone_github",
      "someone.insat@gmail.com",
      "someone_LinkedIn",
      "code_damn_channel",
      "someone_facebook"
    ]
  }
  */

  profile: string;

  event = {
    month: '1994-06-15',
    timeStarts: '07:43',
    timeEnds: '2018-01-01'
  }

  // firebase references
  allProjects: any;
  featuredProjects: any;
  latestProjects: any;

  projectObs$: Observable<Project>;
  userObs$: Observable<User>;

  // profile object returned
  user: User;

  forFeaturedUsers: any;
  forLatestUsers: any;
  forAllUsers: any;

  // observe any change for the project
  allProjectObs$: Observable<Project>;
  featuredProjectObs$: Observable<Project>;
  latestProjectsObs$: Observable<Project>;


  comments$: Observable<any[]>;



  private takePictureOptions: CameraOptions = {
    allowEdit: false,
    saveToPhotoAlbum: true,
    targetWidth: 720,
    targetHeight: 720,
    cameraDirection: this.camera.Direction.BACK,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  private galleryOptions: CameraOptions = {
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 720,
    targetHeight: 720,
    correctOrientation: true
  }


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public projectService: ProjectProvider,
    public utilsProvider: UtilityProvider,
    public platform: Platform,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    public emailProvider: EmailComposer,
    private firebaseService: PictureUtils,
    private cropService: Crop,
    private camera: Camera,
    public auth: AuthService) {
    this.profile = 'projects';
    this.user = this.navParams.get('profile');
    console.log(this.navParams.get('profile'));


  }

  ionViewDidLoad() {

    this.comments$ = this.utilsProvider.load()
      .snapshotChanges()
      .pipe(
        map(
          changes => {
            console.log(changes[0].payload.val());

            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val()
            }));
          }));;

    console.log('ionViewDidLoad ProfilePage');
    let all = this.projectService.projects.forEach((project) => {
      if (project.author == this.auth.getUID()) return project
    });

    console.log(all);

    this.allProjects = this.projectService.projects[1];
    this.featuredProjects = this.projectService.projects[0];
    this.latestProjects = this.projectService.projects[2];

    this.forFeaturedUsers = this.projectService.users['XlpAalsdbuWTni47Scd'];
    this.forLatestUsers = this.projectService.users['XlpAalsdbuWTni47Scd'];
    this.forAllUsers = this.projectService.users['XlpAalsdbuWTni47Scd'];


    /*
    // related to firebase 
    this.userObs$ = this.userProvider
    .getUser('XlpAalsdbuWTni47Scd')
    .snapshotChanges()
    .pipe(
     map(
      changes => {

        console.log(changes.payload.val());
        this.user = changes.payload.val(); 
        
      return {
        key: changes.payload.key, 
        ...changes.payload.val()
      };
    }));

    this.projectService
      .getAllProjects()
      .snapshotChanges()
      .pipe(
        map(
        changes => {

          console.log(changes[0].payload.val());
          this.allProjects = changes[0].payload.val();

          return changes.map( c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }));
        }));

      this.projectService
      .getAllProjects()
      .snapshotChanges()
      .pipe(
        map(
        changes => {

          console.log(changes[0].payload.val());
          this.featuredProjects = changes[0].payload.val();
          
          return changes.map( c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }));
        }));

        
      this.projectService
      .getAllProjects()
      .snapshotChanges()
      .pipe(
        map(
        changes => {

          console.log(changes[0].payload.val());
          this.latestProjects = changes[0].payload.val();
          
          return changes.map( c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }));
        }));
        */

  }


  dismiss() {
    this.navCtrl.pop();
  }

  showContactInfo(_contact) { }

  showMore() { }

  changeSecurity() {
    const prompt = this.alertCtrl.create({
      title: 'Alert',
      message: "Account security changed! \nDo you want to procede?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast('Cancel clicked'); // to implement
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.presentToast('Saved clicked'); // to implement
          }
        }
      ]
    });
    prompt.present();
  }

  addSection(characterNum) {
    let modal = this.modalCtrl.create(AddSectionModal, characterNum);
    modal.onDidDismiss((data) => {
      this.presentToast(data.name + '</>' + data.text);
    });

    modal.present();
  }

  showMenu(caller) { }

  resetPassword() {
    this.presentToast("Cannot reset password. Try later!");
  }

  editSection(_section) {
    const prompt = this.alertCtrl.create({
      title: 'Update',
      message: "Change your current credantials. \nBy submitting the changes we will update it on the server.",
      inputs: [
        {
          name: _section,
          placeholder: 'Write here..'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.presentToast('Cancel clicked'); // to implement
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.presentToast('Saved clicked'); // to implement
            switch (_section) {
              case 'Phone number':

                this.user.phone = data[_section];
                break;
              case 'Login':
                this.user.email = data[_section];
                break;
              case 'Location':
                this.user.location = data[_section];
                break;

            }
            this.presentToast(_section + " have been changed");
          }
        }
      ]
    });
    prompt.present();
  }

  doLogout() {

    this.auth.signOut();
    this.navCtrl.setRoot(TabsPage);
  }

  openImagePickerCrop() {
    this.camera.getPicture(this.takePictureOptions).then(
      (result) => {
        // no callbacks required as this opens a popup which returns async
        this.cropService.crop(result, { quality: 75 }).then(
          newImage => {
            alert('got image path ' + newImage);
            return this.firebaseService.makeFileIntoBlob(newImage, 'image');//convert picture to blob
          }).then((imageBlob) => {
            alert('got image blob ' + imageBlob);
            return this.firebaseService.uploadToFirebase(imageBlob, 'image', 'pictures/');//upload the blob
          }).then((uploadSnapshot: any) => {
            alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
            return this.firebaseService.saveToDatabase(uploadSnapshot);//store reference to storage in database
          }).then((_uploadSnapshot: any) => {
            alert('file saved to asset catalog successfully  ');
          }, (_error) => {
            alert('Error ' + (_error.message || _error));
          });
      },
      error => console.error("Error cropping image", error)
    );
  }

  openGalleryImagePickerCrop() {
    this.camera.getPicture(this.galleryOptions).then(
      (result) => {
        // no callbacks required as this opens a popup which returns async
        this.cropService.crop(result, { quality: 75 }).then(
          newImage => {
            alert('got image path ' + newImage);
            return this.firebaseService.makeFileIntoBlob(newImage, 'image');//convert picture to blob
          }).then((imageBlob) => {
            alert('got image blob ' + imageBlob);
            return this.firebaseService.uploadToFirebase(imageBlob, 'image', 'pictures/');//upload the blob
          }).then((uploadSnapshot: any) => {
            alert('file uploaded successfully  ' + uploadSnapshot.downloadURL);
            return this.firebaseService.saveToDatabase(uploadSnapshot);//store reference to storage in database
          }).then((_uploadSnapshot: any) => {
            alert('file saved to asset catalog successfully  ');
          }, (_error) => {
            alert('Error ' + (_error.message || _error));
          });
      },
      error => console.error("Error cropping image", error)
    );
  }


  // generic method for creating toasts
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}



/* template class:: project description text modal */

@Component({
  selector: 'profile-details',
  templateUrl: 'profile-edit-modal.html'
})

export class AddSectionModal {

  text: any;
  name: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss({ text: this.text, name: this.name });
  }
}

