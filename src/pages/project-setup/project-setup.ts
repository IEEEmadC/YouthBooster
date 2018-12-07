import { Project } from './../../modals/project.modal';
import { DetailsPage } from './../details/details';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ToastController, LoadingController, Platform, ActionSheetController, ModalController, ViewController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Observable } from 'rxjs/Observable';
import { YtProvider } from './../../providers/yt/yt';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Keyboard } from '@ionic-native/keyboard';
import { EmailComposer } from '@ionic-native/email-composer';
import { User } from '../../modals/user.modal';



/**
 * Generated class for the ProjectSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-setup',
  templateUrl: 'project-setup.html',
})
export class ProjectSetupPage {

  @ViewChild(Slides) steps: Slides;

  event = {
    month: '2015-06-15',
    timeStarts: '07:43',
    timeEnds: '2018-01-01'
  }

  fileURI: any = "#ImagePicker";
  fileName: any;

  imageURI: any = "#ImagePicker";
  imageInfo: any = "ImageFileName.ext (102 KB)";

  ifSelected_link_1: any = false;
  ifSelected_link_2: any = false;
  ifSelected_link_3: any = false;

  selectedVideoUrl: any;

  websiteUrl: string;
  
  tagsArray:any= [];
  filesArray:any= [];
  imageSrcArray:any=[];
  urlsArray:any=[];

  summary: string = "Add Summary text..";

  fullDescription: string = "Add Description text.."

  // firebase project reference to create
  project: Project;
  // firebase author reference to create
  author: User;
  
  constructor(public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public actionsheetCtrl: ActionSheetController,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public keyboard: Keyboard,
    public emailProvider: EmailComposer
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectSetupPage');
  }

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    }
  ];

  // finilize project setup & prompt
  pushDataToFirebase() {
    const alert = this.alertCtrl.create({
      title: 'Almost Done!',
      subTitle: "By submitting this post, your project become public by default; anyone can view and interact with this post.<br/>This content may be downloaded or shared",
      buttons: [
        {
            text: "Cancel",
            role: 'cancel',
            handler: () => {
            // dismiss
            }
        },
        {
            text: "Got it!",
            handler: () => {
            // push to firebase
            this.commitChanges();
            // navigate next page
            this.navCtrl.push(DetailsPage);
          }
        }
    ],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  
  }

  // push project to backend system:: firebase 
  commitChanges() {
//  this.author = findUser(mAuth.currentUser);
    this.project.author = this.author;
    this.project.attachments = this.filesArray;
    this.project.description = this.fullDescription;
    this.project.images = this.imageSrcArray;
//  this.project.memberRequirements
    this.project.tags = this.tagsArray;
    this.project.timestamp = new Date().getDate();
    this.project.title
    this.project.videos = this.urlsArray;
    this.project.websiteUrl = this.websiteUrl;
    this.project.budget
    this.project.dueDate
    this.project.summary = this.summary;
    this.project.dueDate
  }

  // to implement:: 
  openFavorites() {
    //  this.navCtrl.push(FavoritesPage);
  }

  // to implement:: ask for help
  openEmailProvider() {

    this.emailProvider.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send

        let email = {
          to: 'yoothbooster@contact.com',
          cc: 'erika@mustermann.de',
          bcc: ['john@doe.com', 'jane@doe.com'],
          attachments: [
            'file://img/logo.png',
            'res://icon.png',
            'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
            'file://README.pdf'
          ],
          subject: 'Cordova Email Composer Test',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailProvider.open(email);
   
      }
     });
  }

  // sliding between 3 steps to post your new project
  nextStep(position) {
    this.steps.slideTo(position, 500);
  }

  // add project tags prompt 
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Tags',
      message: "Enter a tag name for this new Project you're so keen on adding",
      inputs: [
        {
          name: 'TagName',
          placeholder: 'TagName'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked'); // to implement
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log("save clicked"); // to implement
            this.tagsArray.push({'value':data['TagName']});
            // commit changes
          }
        }
      ]
    });
    prompt.present();

  }

  // get attached file locally
  // to implement:: open from drive 
  getFile(caller) {
    this.fileChooser.open().then(file => {
      this.filePath.resolveNativePath(file).then(resolvedFilePath => {
        //this.presentToast(resolvedFilePath.split('/'));
        let subpaths = resolvedFilePath.split('/');
        this.fileName = subpaths[subpaths.length - 1];
        this.fileURI = this.fileName;
        this.presentToast(this.fileURI);

        switch(caller) {
          case 'file_manager':
            this.filesArray.push({'value':this.fileURI});
          break;
          case 'image_manager':
            this.imageSrcArray.push({'value':this.fileURI});
          break;
        }
            
      }).catch(err => {
        this.presentToast(JSON.stringify(err));
      });
    }).catch(err => {
      this.presentToast(JSON.stringify(err));
    });
  }

  // generic method for creating toasts
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  // actionSheet to file imported 
  openMenu(caller,index) {
    let actionSheet = this.actionsheetCtrl.create({
      title: this.fileURI,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            switch(caller){
              case 'tagsArray':
                  this.tagsArray.splice(index,1);
              break;
              case 'filesArray':
                  this.filesArray.splice(index,1);
              break;
              case 'imageSrcArray':
                  this.imageSrcArray.splice(index,1);
              break;
              case 'urlsArray':
                  this.urlsArray.splice(index,1);
              break;
            }
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // video search modal
  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.onDidDismiss((data) => {
      this.presentToast(data);
      this.urlsArray.push({'value':data});
      this.selectedVideoUrl = data;
      this.ifSelected_link_1 = true;
    });

    modal.present();

  }

  // project details modal
  openTextModal(characterNum) {

    let modal = this.modalCtrl.create(ModalTextContentPage, characterNum);
    modal.onDidDismiss((data) => {
      this.presentToast(data);
      this.summary = data;
    });

    modal.present();

  }

  // prompt user to get website link (optional)
  promptLink() {
    const prompt = this.alertCtrl.create({
      title: 'Website Link',
      message: "Create a link that boosters can click to leave a review of your business or company. \nYou can easily share the link with others to encourage them to write reviews and rate your project.",
      inputs: [
        {
          name: 'link',
          placeholder: 'example@domaine.com'
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
            this.websiteUrl = data;
          }
        }
      ]
    });
    prompt.present();
  }

}


/* template class:: video search modal */

@Component({
  selector: 'video-project-setup',
  templateUrl: 'video-search-modal.html'
})

export class ModalContentPage {

  Videos: Observable<any[]>;
  videoUrl: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private ytProvider: YtProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private iab: InAppBrowser

  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss(this.videoUrl);
  }

  // get the query and search for related video
  public searchForVideos(query) {
    this.Videos = this.ytProvider.getListVideos(query);
    this.Videos.subscribe(data => {
      console.log(query);
      console.log('videos: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err,
        buttons: ['OK']
      });
      alert.present();
    })
  }

  // get video url when submitted
  getVideoUrl(videoID) {
    let baseUrl = "https://www.youtube.com/watch?v=";
    this.videoUrl = baseUrl + videoID;
    //this.presentToast(this.videoUrl);
    this.dismiss();

    // let browser = this.iab.create(this.videoUrl, '_system'); 
    // For system browser, you'll be prompt to choose your browser if you have more than one let browser = new InAppBrowser('url', '_blank'); //For webview,
  }

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
  selector: 'details-project-setup',
  templateUrl: 'text-modal.html'
})

export class ModalTextContentPage {

  text: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss(this.text);
  }
}
