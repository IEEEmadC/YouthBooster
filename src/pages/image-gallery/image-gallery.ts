import { Project } from './../../modals/project.modal';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ImageGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-gallery',
  templateUrl: 'image-gallery.html'
})
export class ImageGalleryPage {

  galleryType = 'regular';
  project: Project;
  images: string[];
  edit_mode = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private platform: Platform,
              private actionsheetCtrl: ActionSheetController,
              public imageViewer: PhotoViewer) {
    if(navParams.data == 'edit') {
      this.edit_mode = true;
    }     
    
    this.project = navParams.get('project');
    this.images = this.project.images;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageGalleryPage');
  }

  viewImage(path) {
    // demo image 
    path = "https://images.unsplash.com/photo-1542764489-9a714a1dc657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39106215860331724b1cd47401f98379&auto=format&fit=crop&w=334&q=80";
    this.imageViewer.show(path, 'My image title', {share: true});
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        // this.images.push( this.images[i] % 7);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  showMenu(index) {
    let actionSheet = this.actionsheetCtrl.create({
      title: "Image Select",
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
                this.images.splice(index, 1);
                console.log(this.images);
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
}
