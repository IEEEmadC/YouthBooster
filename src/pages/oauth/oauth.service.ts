import { Injectable, Injector } from '@angular/core';
import { FacebookOauthProvider } from './facebook/facebook-oauth.provider';
import { IOathProvider } from './oauth.provider.interface';
import { GoogleOauthProvider } from './google/google-oauth.provider';
import { OAuthToken } from './models/oauth-token.model';
@Injectable()
export class OAuthService {
	private oauthTokenKey = 'oauthToken';
	private injector: Injector;
constructor(injector: Injector) {
		this.injector = injector;
	}
login(source: string) {
		return this.getOAuthService(source).login().then(accessToken => {
			if (!accessToken) {
				return Promise.reject('No access token found');
			}
let oauthToken = {
				accessToken: accessToken,
				source: source
			};
			this.setOAuthToken(oauthToken);
			return oauthToken;
		});
	}
getOAuthService(source?: string): IOathProvider {
		source = source || this.getOAuthToken().source;
		switch (source) {
			case 'facebook':
				return this.injector.get(FacebookOauthProvider);
			case 'google':
				return this.injector.get(GoogleOauthProvider);
			default:
				throw new Error(`Source '${source}' is not valid`);
		}
	}
setOAuthToken(token: OAuthToken) {
		localStorage.setItem(this.oauthTokenKey, JSON.stringify(token));
	}
getOAuthToken(): OAuthToken {
		let token = localStorage.getItem(this.oauthTokenKey);
		return token ? JSON.parse(token) : null;
	}

	getProfile() {
	if (!this.isAuthorized()) {
		return Promise.reject('You are not authorized');
	}
	let oauthService = this.getOAuthService();
		return oauthService.getProfile(this.getOAuthToken().accessToken);
	}
	
	isAuthorized(): boolean {
		return !!this.getOAuthToken();
	}

}