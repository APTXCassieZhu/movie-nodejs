import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

let apiLoaded = true;

@Component({
  selector: 'app-child-id',
  templateUrl: './child-id.component.html',
  styleUrls: ['./child-id.component.css']
})
export class ChildIdComponent implements OnInit {
  public id : any;
  public media_type: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('media_type');
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      // const tag = document.createElement('script');
      // // tag.src = 'https://www.youtube.com/iframe_api';
      // // document.body.appendChild(tag);
      // apiLoaded = true;
    }
  }

}
