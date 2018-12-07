import { User } from './../../modals/user.modal';
import { Project } from './../../modals/project.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
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
    month: '2015-06-15',
    timeStarts: '07:43',
    timeEnds: '2018-01-01'
  }

  // firebase references
  allProjects: Project;
  featuredProjects: Project;
  latestProjects: Project;
  // profile object returned
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.profile = 'projects';    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage'); 
  }

  dismiss() {
    this.navCtrl.pop();
  }

  showContactInfo(_contact) {}
  
  showMore() {}
  
  addSection() {}

  showMenu(caller) {}

  editSection(_section) {}

  changePicture() {}

  doLogout() {}
}
