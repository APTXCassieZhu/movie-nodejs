import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { DetailsService } from "../../services/details.service"
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { smallSlide } from '../homepage/homepage.component';

let apiLoaded = false;
export interface media{
  "title": string,
  "release_date": string,
  "runtime": number[],
  "overview": string,
  "vote_average": number,
  "tagline": string,
  "genres": string[],
  "spoken_languages": string[],
  "poster_path": string
}

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Added to watchlist.',
}, {
  type: 'danger',
  message: 'Removed from watchlist.',
}];

@Component({
  selector: 'app-child-id',
  templateUrl: './child-id.component.html',
  styleUrls: ['./child-id.component.css']
})
export class ChildIdComponent implements OnInit {
  public id : any;
  public media_type: any;
  public cur_media: media = {} as media;
  public duration: string = '';
  public added: boolean = false;
  public alert: Alert = {} as Alert;
  public showAlert = '';
  private _success = new Subject<string>();
  facebook = faFacebookSquare;
  twitter = faTwitter;
  constructor(private route: ActivatedRoute, private detailsService: DetailsService) { }
  
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert = {} as NgbAlert; 

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('media_type');
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    this.detailsService.getVideo(this.id, this.media_type).subscribe(res => {
      this.cur_media = res;
      this.cur_media.release_date = this.cur_media.release_date.substring(0,4);
      var hours = Math.floor(this.cur_media.runtime[0] / 60);
      var minutes = this.cur_media.runtime[0] % 60;
      this.duration = hours + 'hrs ' + minutes + 'mins';
      
      // for local storage
      var continue_list = JSON.parse(window.localStorage.getItem('continue_list') || "[]");
      console.log(continue_list);
      console.log(this.cur_media);
      var cur_smallSlide = {id: this.id, title: this.cur_media.title, poster_path: this.cur_media.poster_path, media_type: this.media_type};
      if(continue_list == null || continue_list.length == 0){
        var list : smallSlide[] = [cur_smallSlide];
        window.localStorage.setItem('continue_list', JSON.stringify(list));
      }else{
        // unique
        if(continue_list.indexOf(cur_smallSlide) === -1) {
          continue_list.unshift(cur_smallSlide);
        }
        // greater than 24, then start to drop
        if(continue_list.length > 24){
          continue_list.slice(24);
        }
      }
    })

    this._success.subscribe(message => this.showAlert = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if(this.selfClosingAlert){
        this.selfClosingAlert.close();
      }
    });
  }

  addToWatchList(event: any){
    this.showAlert = '';
    this.added = true;
    this.alert = ALERTS[0];
    this._success.next(`${new Date()} - Message successfully changed.`); 
  }
  removeFromWatchList(event: any){
    this.showAlert = '';
    this.added = false;
    this.alert = ALERTS[1];
    this._success.next(`${new Date()} - Message successfully changed.`); 
  }
}
