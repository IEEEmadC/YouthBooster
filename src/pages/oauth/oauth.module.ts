import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OAuthProvidersListPage } from './list/oauth-providers.list.page';
import { OAuthService } from '../../pages/oauth/oauth.service';
import { GoogleOauthProvider } from './google/google-oauth.provider';
import { FacebookOauthProvider } from './facebook/facebook-oauth.provider';
import { OAuthProfilePage } from './profile/oauth-profile.page';

@NgModule({
	imports: [IonicModule],
	declarations: [
		OAuthProfilePage,
		OAuthProvidersListPage
	],
	entryComponents: [
		OAuthProfilePage,
		OAuthProvidersListPage
	],
	providers: [
		OAuthService,
		GoogleOauthProvider,
 		FacebookOauthProvider
	]
})
export class OAuthModule {
}