import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
	public facebook = {
		apiUrl: 'https://graph.facebook.com/v2.3/',
		appId: '2214038165274235',
		scope: ['email']
	};
	public google = {
		apiUrl: 'https://www.googleapis.com/oauth2/v3/',
		appId: '671061790397-8vdjv76gjcci3bh3d29466on7di4qca0.apps.googleusercontent.com',
		scope: ['email']
	};
}