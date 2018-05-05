import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  searchTerm:string;
  videoId:string;
  constructor(private youtubeService:YoutubeService,private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  handleSearch(){
    this.youtubeService.getListData(this.searchTerm)
    .subscribe((res:any)=>{
      this.youtubeService.videos$$.next(res.items);
    })
  }

 

  sanitizeUrl(value){
  return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
