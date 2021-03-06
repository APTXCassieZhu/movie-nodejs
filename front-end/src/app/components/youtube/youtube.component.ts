import { Component, OnInit, Input } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { DetailsService } from "../../services/details.service"

let apiLoaded = false;
export interface Video{
  site: string,
  type: string,
  name: string,
  key: string
}

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  @Input() videoId: any;
  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    
  }

}
