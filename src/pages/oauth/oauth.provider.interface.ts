import { OAuthProfile } from './models/oauth-profile.model';
export interface IOathProvider {
	login();
	getProfile(accessToken: string);
}