import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AppareilsPage } from '../appareils/appareils';

import {AdvancedSocialPage} from "../AdvancedSocial/AdvancedSocial";



@Component({

  selector: 'page-home',

  templateUrl: 'home.html'

})

export class HomePage {


  advancedSocialPage = AdvancedSocialPage;

}
