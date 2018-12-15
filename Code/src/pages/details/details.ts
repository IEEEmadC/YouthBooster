import { Commentaire } from '../../modals/comment.modal';
import { ProfilePage } from '../profile/profile';
import { CommentsPage } from '../comments/comments';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Component, trigger, style, transition, animate, keyframes, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, ToastController, ModalController, ViewController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { DatePicker } from '@ionic-native/date-picker';
import { ImageGalleryPage } from '../image-gallery/image-gallery';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

import { ProjectsProvider } from '../../providers/projects/project';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../modals/project.modal';
import { User } from '../../modals/user.modal';

import { map } from 'rxjs/operators';


declare var google;


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  animations: [

    trigger('fadeIn', [
      transition('void => *', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .75 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ]),

    trigger('fadeUp', [
      transition('void => *', [
        animate('900ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})

export class DetailsPage {
/*
  project = {
    videos: [
      {
        video_url: "https://www.youtube.com/watch?v=tm9KHjxSzxw",
        video_id: "click and play this video"
      },
      {
        video_url: "https://www.youtube.com/watch?v=tm9KHjxSzxw",
        video_id: "click and play this video"
      },
      {
        video_url: "https://www.youtube.com/watch?v=tm9KHjxSzxw",
        video_id: "click and play this video"
      }
    ],

    images: [
      {
        image_url: "assets/imgs/Category_3.png",
        image_id: "assets/imgs/Category_3.png"
      }
    ],

    attachments: [
      {
        attach_url: "Project Summary.pdf",
        attach_id: "Project Summary.pdf"
      }
    ],
    sections: [],
    site: "https://ionicframework.com/posts/code"

  }

*/
  full_scroll = false;
  toggleMode: any = 'Read more'

  screenshots: any = ['s1', 's2', 's3'];
  dueDate: string = "9 Dec 2018";
  time: string;
  // for maps frame
  isAvailable = false;

  // current location
  mLocation = {
    lat: -34.9290,
    lng: 138.6010
  }

  rates = ['emptystar', 'emptystar', 'emptystar', 'emptystar', 'emptystar'];

  // project object  
  project: Project;

  // observe any change for all projects
  projectListObs$ : Observable<Project[]>;

  // observe any change for the project
  projectObs$ : Observable<Project>;

  // observe project author
  author: User;

  // observe project comments
  comments: Commentaire[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private projectService: ProjectsProvider,
    public actionsheetCtrl: ActionSheetController,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private datePicker: DatePicker,
    private imageViewer: PhotoViewer,
    private sanitizer : DomSanitizer,
    private youtube: YoutubeVideoPlayer) {
/*
    this.project.sections['Summary'] = "Project Summary text";
    this.project.sections['Requirements'] = "Project Description text";
    this.project.sections['Fixed Budget'] = "Project Budget text";
*/
    this.project = this.navParams.get('project');
    this.author = this.navParams.get('user');

    this.dueDate = new Date(this.project.dueDate).toDateString();
    this.time = new Date(this.project.timestamp).toLocaleTimeString();

    console.log("user " + JSON.stringify(this.author));
    
    // related to firebase 
    this.projectListObs$ = this.projectService
      .getAllProjects()
      .snapshotChanges()
      .pipe(
        map(
        changes => {
          return changes.map( c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }));
        }));

    // related to firebase 
    this.projectObs$ = this.projectService
    .getProject('0')
    .snapshotChanges()
    .pipe(
     map(
      changes => {

        console.log(changes.payload.val());
        
      return {
        key: changes.payload.key, 
        ...changes.payload.val()
      };
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    // increment number of views 
  }

  ionViewWillEnter(){
    console.log('ionViewDidLoad DetailsPage');
    // increment number of views
  }

  // rate this project and give personal feedback 
  doVote() { }


  addLikes() { }

  openSettings() { }

  sharePost() { }

  doRate() {
      const alert = this.alertCtrl.create({
      title: 'How would you rate YB project?',
      subTitle: "Tap the number of stars you'd give us on a scale from 1-5",
      cssClass: 'alertstar',
      enableBackdropDismiss:true,
      buttons: [
           { text: '1', handler: data => { this.resolveRec(1);}, cssClass: this.rates[0]},
           { text: '2', handler: data => { this.resolveRec(2);}, cssClass: this.rates[1]},
           { text: '3', handler: data => { this.resolveRec(3);}, cssClass: this.rates[2]},
           { text: '4', handler: data => { this.resolveRec(4);}, cssClass: this.rates[3]},
           { text: '5', handler: data => { this.resolveRec(5);}, cssClass: this.rates[4]}
      ]
 });
  alert.present();
}

  resolveRec(index) {
    this.presentToast("Your feedback was saved");
    let idx = index;
    while(idx) {
      idx--;
      this.rates[idx] = 'filledstar';
    }
    idx = index;
    while(5- idx) {
      this.rates[idx] = 'emptystar';
      idx++;
    }
  }

  openAuthorProfile() { 
    
    this.navCtrl.push(ProfilePage, {"profile": this.author});
  }

  processContribution() { }

  mapsURL() : SafeUrl {
    if(this.isAvailable) {
      let url = "https://www.google.com/maps/embed/v1/place?q=" + this.mLocation.lat + "," + this.mLocation.lng + "&key=AIzaSyAcFZpOczzhdHPVi0FZMwkPC9Dp4K46VC4"
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else return null;
  }

  addEmbeddedMaps() {

    let modal = this.modalCtrl.create(MapsSectionModal);
    modal.onDidDismiss((data) => {
      this.presentToast(data.lat() + "/" + data.lng());
      if(data != null) {
        this.mLocation.lat = parseFloat(data.lat());
        this.mLocation.lng = parseFloat(data.lng());
        this.isAvailable = true;
      }
    });

    modal.present();
  }

  openComments() {
    this.navCtrl.push(CommentsPage);
  }

  openImage(path) {
    // demo image 
    path = "https://images.unsplash.com/photo-1542764489-9a714a1dc657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39106215860331724b1cd47401f98379&auto=format&fit=crop&w=334&q=80";
    this.imageViewer.show(path, 'My image title', { share: true });
  }

  openImageGallery(mode) {
    this.navCtrl.push(ImageGalleryPage, {'edit': mode, 'gallery': this.project.images});
  }

  launchSite() {
    const browser = this.iab.create(this.project.websiteUrl, '_system');
    // browser.close();
  }

  playVideo(index) {
    this.youtube.openVideo(this.project.videos[index]);
  }

  editSection(section_name) {
    let data = {
      name: section_name,
    //  text: this.project.sections[section_name]
    };
    let modal = this.modalCtrl.create(EditSectionModal, data);
    modal.onDidDismiss((data) => {
      this.presentToast(data);
    });

    modal.present();
  }

  changeDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        console.log('Got date: ', date);
        this.dueDate = date.toLocaleDateString();

      }
      ,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showMenu(caller, index) {
    let actionSheet = this.actionsheetCtrl.create({
      title: caller,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            switch (caller) {
              case 'attach':
                this.project.attachments.splice(index, 1);
                break;
              case 'video':
                this.project.videos.splice(index, 1);
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
          text: 'Open',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
            switch (caller) {
              case 'attach':
                // open file in browser
                const browser = this.iab.create(this.project.attachments[index], '_system');
                browser.close();
                break;
              // open video in youtube application with its url
              case 'video':
                this.playVideo(index);
                break;
            }
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

  showMore() {
    this.full_scroll = !this.full_scroll;
    if (this.full_scroll == true)
      this.toggleMode = "Show less";
    else this.toggleMode = "Read more";

  }

  addSection(characterNum) {
    let modal = this.modalCtrl.create(NewSectionModal, characterNum);
    modal.onDidDismiss((data) => {
      this.presentToast(data.name + '</>' + data.text);
    });

    modal.present();
  }

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

}

/* template class:: project description text modal */

@Component({
  selector: 'project-details',
  templateUrl: 'section-modal.html'
})

export class NewSectionModal {

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



/* template class:: project description text modal */

@Component({
  selector: 'project-details-edit',
  templateUrl: 'edit-section-modal.html'
})

export class EditSectionModal {

  sectionName: any;
  text: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
    this.sectionName = 'Project Name' + ' | ' + this.params.data.name;
    this.text = params.data.text;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.text);
  }
}


/* template class:: geolocation related to project author */

@Component({
  selector: 'project-details-maps',
  templateUrl: 'maps-section-modal.html'
})

export class MapsSectionModal {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  marker: any = null;
  position = new google.maps.LatLng(-34.9290, 138.6010);

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  confirmLocation() {
    this.viewCtrl.dismiss(this.position);
  }

  ionViewDidLoad() {
    console.log("maps loaded successfully!")
    this.loadMap();
  }

  loadMap() {

    let mapOptions = {
      center: this.position,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    google.maps.event.addListener(this.map, 'click', (event) => {
      this.position = event.latLng;
      this.addMarker();
    });
  }

  addMarker() {

    if (this.marker == null) {
      this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.position
      });
    }
    else {
      this.marker.setPosition(this.position);
    }
    // move camera 
    this.map.panTo(this.position);

    // add relevant info -- optional --
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(this.marker, content);
    // preview update
    this.presentToast(this.position);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
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
