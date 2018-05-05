import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private youtubeService:YoutubeService) { }
  videoId:string;
  videosCollection = [];
  ngOnInit() {
    this.youtubeService.videos$$
    .switchMap(searchResults =>{
      return  this.youtubeService.getVideos(searchResults);
    })
    .subscribe((res:any)=>{
      this.videosCollection = res.items;
    })
  }
}
