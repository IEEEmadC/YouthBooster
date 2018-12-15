import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

/*
  Generated class for the YtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YtProvider {

  apiKey = 'AIzaSyAcFZpOczzhdHPVi0FZMwkPC9Dp4K46VC4';

  constructor(public http: Http) {
    console.log('Hello YtProvider Provider');
  }

  getListVideos(video) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' 
    + this.apiKey 
    + '&q=' 
    + video 
    + '&type=video&order=viewCount&part=snippet&maxResults=20')
    .pipe(
      map((res) =>{
      return res.json()['items'];
    }));
  }
 
  getVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .pipe(
     map((res)=>{
      return res.json()['items'];
    }));
  }

}
