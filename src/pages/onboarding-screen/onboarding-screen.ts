import { HomePage } from './../home/home';
import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the OnboardingScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding-screen',
  templateUrl: 'onboarding-screen.html',
  animations: [

    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(-65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({transform: 'translateX(0)', offset: 0}),
        style({transform: 'translateX(65px)', offset: .3}),
        style({transform: 'translateX(0)', offset: 1})
      ])))
    ])
  ]
})
export class OnboardingScreenPage {


  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';
  btnClass: string = "skip";

  splash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingScreenPage');
    setTimeout(() => {
      this.splash = false;
    }, 5000);
  }

  skip() {
    this.navCtrl.push(HomePage);
  }

  slideChanged() {
    if (this.slides.isEnd()) {
      this.btnClass = "ok-go";
      this.skipMsg = "Alright, I got it";
    }
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
