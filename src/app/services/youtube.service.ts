import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class YoutubeService {
  key = 'AIzaSyDc6yO_Gt8I1bVCr6qbK3M49ERyks1QP98';
  baseApi = 'https://www.googleapis.com/youtube/v3/search';
  videoApi = 'https://www.googleapis.com/youtube/v3/videos';
  videos$$: ReplaySubject<any> = new ReplaySubject(1);
  maxResults = 5;
  /**
     * Constructor
     * @param http HttpClient used to make http requests
     */
  constructor(private http: HttpClient) { }


  /**
  * Get list of values according to the key sent
  * @param key the key to look for
  */
  getListData(key): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseApi}?q=${key}&part=snippet&key=${this.key}&maxResults=${this.maxResults}&order=viewCount&type=video`);
  }

  getVideos(ids) {
    let quryParams = '?id=';
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index].id.videoId;
      // quryParams += `&id=${element}`;
       quryParams += `${element},`;
    }
    return this.http
      // .get<any[]>(`${this.videoApi}${quryParams}&key=${this.key}`);
      .get<any[]>(`${this.videoApi}${quryParams}&part=snippet,statistics,player,contentDetails&key=${this.key}&maxResults=${this.maxResults}`);
  }
}
