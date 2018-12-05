import { Component } from '@angular/core';
import {AdvancedSocialPage} from "../AdvancedSocial/AdvancedSocial";
import {TeamPage} from "../team/team";
import {NotifPage} from "../notif/notif";
@Component({

  selector: 'page-tabs',

  templateUrl: 'tabs.html'

})

export class TabsPage {

  advancedSocialPage: any = AdvancedSocialPage;

  notifPage: any = NotifPage;

  homePage: any = TeamPage;
}
