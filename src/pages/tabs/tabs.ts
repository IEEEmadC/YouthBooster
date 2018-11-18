import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import {AdvancedSocialPage} from "../AdvancedSocial/AdvancedSocial";

@Component({

  selector: 'page-tabs',

  templateUrl: 'tabs.html'

})

export class TabsPage {

  advancedSocialPage: any = AdvancedSocialPage;

  settingsPage: any = SettingsPage;

  homePage: any = AdvancedSocialPage;
}
