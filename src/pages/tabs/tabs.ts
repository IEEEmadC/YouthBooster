import { Component  } from '@angular/core';
import {BrowseProjectsPage} from "../browse-projects/browse-projects";
import {TeamPage} from "../team/team";
import {NotifPage} from "../notif/notif";
 

@Component({

  selector: 'page-tabs',

  templateUrl: 'tabs.html'

})

export class TabsPage {



  browseProjectsPage= BrowseProjectsPage;

  notifPage= NotifPage;

  profilPage= TeamPage;


}
