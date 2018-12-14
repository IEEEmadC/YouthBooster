import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnboardingScreenPage } from './onboarding-screen';

@NgModule({
  declarations: [
    OnboardingScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(OnboardingScreenPage),
  ],
})
export class OnboardingScreenPageModule {}
