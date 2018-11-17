import { Component } from '@angular/core';

import { AppareilsPage } from '../appareils/appareils';

import { SettingsPage } from '../settings/settings';

import {HomePage} from "../home/home";

import {AdvancedSocialPage} from "../AdvancedSocial/AdvancedSocial";

@Component({

  selector: 'page-tabs',

  templateUrl: 'tabs.html'

})

export class TabsPage {

  advancedSocialPage: any = AdvancedSocialPage;

  settingsPage: any = SettingsPage;

  homePage: any = HomePage;
}
