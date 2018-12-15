import { Message } from '../../modals/message.modal';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { ProjectProvider } from '../../providers/project/project';
import { OnboardingScreenPage } from '../onboarding-screen/onboarding-screen';

@Component({
	selector: 'as-page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {
	signupError: string;
	form: FormGroup;

	constructor(
		fb: FormBuilder,
		private navCtrl: NavController,
		private auth: AuthService,
		private projectService: ProjectProvider
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			username: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
		});
	}

	signup() {
		let data = this.form.value;

		let credentials = {
			email: data.email,
			password: data.password
		};

		let userCreds = {
			username: data.username,
			email: data.email,
			password: data.password
		};
		console.log(JSON.stringify(userCreds));

		this.auth.signUp(credentials).then(
			(ref) => {
				this.navCtrl.setRoot(OnboardingScreenPage)
				console.log(ref);

				this.projectService.addUser(ref.user.uid, userCreds);
			},
			error => {
				this.signupError = error.message;
				alert(error.message);
			}
		);
	} // check password and reenter password if equal 
}
