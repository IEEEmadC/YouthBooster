import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage} from "../tabs/tabs";
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
    public toastCtrl: ToastController,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(TabsPage),
				error => this.loginError = error.message
			);
    }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
  this.auth.signInWithGoogle()
    .then(
      () => this.navCtrl.setRoot(TabsPage),
      error => console.log(error.message+" here i am")
    );
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Unavailable for now  \n Work still in progress',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }



}
