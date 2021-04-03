import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { SlideService } from "../../services/slide.service"
import { DetailsService } from "../../services/details.service"
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

import { SmallSlide } from '../homepage/homepage.component';
import { Video } from '../youtube/youtube.component';

export interface MediaDetail{
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
  public cur_media: MediaDetail = {} as MediaDetail;
  public duration: string = '';
  public added: boolean = false;
  public alert: Alert = ALERTS[0];
  public showAlert = '';
  private _success = new Subject<string>();
  facebook = faFacebookSquare;
  twitter = faTwitter;
  public continue_list: SmallSlide[] = [];
  public watch_list: SmallSlide[] = [];
  public cur_smallSlide : SmallSlide = {} as SmallSlide;
  public video: Video = {} as Video;
  public twitterUrl : string = '';
  public facebookUrl : string = '';

  public title1: string = 'Recommended Movies';
  public title2: string = 'Similar Movies';
  public sum1: number = 0;
  public sum2: number = 0;
  public recommend_list: SmallSlide[][] = [];
  public similar_list: SmallSlide[][] = [];
  tempFormatted : any[] = [];
  constructor(private route: ActivatedRoute, 
    private detailsService: DetailsService, 
    private cd: ChangeDetectorRef,
    private slideService: SlideService) { }
  
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert = {} as NgbAlert; 
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('media_type');

    this.detailsService.getVideo(this.id, this.media_type).subscribe(res => {
      this.video = res;
    })

    this.detailsService.getDetails(this.id, this.media_type).subscribe(res => {
      this.cur_media = res;
      this.cur_media.release_date = this.cur_media.release_date.substring(0,4);
      var hours = Math.floor(this.cur_media.runtime[0] / 60);
      var minutes = this.cur_media.runtime[0] % 60;
      this.duration = hours + 'hrs ' + minutes + 'mins';
      
      // for local storage
      this.continue_list = JSON.parse(window.localStorage.getItem('continue_list') || "[]");
     
      this.cur_smallSlide = {id: this.id, title: this.cur_media.title, poster_path: this.cur_media.poster_path, media_type: this.media_type};
      if(this.continue_list == null || this.continue_list.length == 0){
        this.continue_list = [this.cur_smallSlide];
      }else{
        // unique
        var idx = this.continue_list.findIndex(x => x.id === this.cur_smallSlide.id);
        if(idx > -1) {
          this.continue_list.splice(idx, 1);
        }
        this.continue_list.unshift(this.cur_smallSlide);
        // greater than 24, then start to drop
        if(this.continue_list.length > 24){
          this.continue_list.slice(24);
        }
      }
      window.localStorage.setItem('continue_list', JSON.stringify(this.continue_list));

      // for share
      this.twitterUrl = 'https://twitter.com/intent/tweet?text=Watch%20'+this.cur_media.title
        +' https://www.youtube.com/watch?v='+ this.video.key +'       &hashtags=USC&hashtags=CSCI571&hashtags=FightOn';
      this.facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v='+ this.video.key;
    })

    this._success.subscribe(message => this.showAlert = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if(this.selfClosingAlert){
        this.selfClosingAlert.close();
      }
    });

    // for local storage
    this.watch_list = JSON.parse(window.localStorage.getItem('watch_list') || "[]");
    // check if this movie/tv already in watch list or not
    var idx = this.watch_list.findIndex(x => x.id === this.id);
    this.added = (idx > -1) ? true : false;

    this.slideService.getRecommend(this.id, this.media_type).subscribe(res => {
      this.sum1 = Object.values(res)[0].length;
      this.recommend_list = this.format(Object.values(res)[0]);
    })
    this.slideService.getSimilar(this.id, this.media_type).subscribe(res => {
      this.sum2 = Object.values(res)[0].length;
      this.similar_list = this.format(Object.values(res)[0]);
    })
  }

  addToWatchList(event: any){
    this.showAlert = '';
    this.added = true;
    this.alert = ALERTS[0];
    this._success.next(`${new Date()} - Message successfully changed.`); 
    
    // update local storage
    if(this.watch_list == null || this.watch_list.length == 0){
      this.watch_list = [this.cur_smallSlide];
    }else{
      // unique
      var idx = this.watch_list.findIndex(x => x.id === this.cur_smallSlide.id);
      if(idx > -1) {
        this.watch_list.splice(idx, 1);
      }
      this.watch_list.unshift(this.cur_smallSlide);
      // greater than 24, then start to drop
      if(this.watch_list.length > 24){
        this.watch_list.slice(24);
      }
    }
    window.localStorage.setItem('watch_list', JSON.stringify(this.watch_list));
    // this.cd.detectChanges();
  }

  removeFromWatchList(event: any){
    this.showAlert = '';
    this.added = false;
    this.alert = ALERTS[1];
    this._success.next(`${new Date()} - Message successfully changed.`); 
    
    // update local storage
    var idx = this.watch_list.findIndex(x => x.id === this.cur_smallSlide.id);
    this.watch_list.splice(idx, 1);
    window.localStorage.setItem('watch_list', JSON.stringify(this.watch_list));
  }

  format(slides: SmallSlide[]){
    this.tempFormatted = [];
    var j = -1;

    for (var i = 0; i < slides.length; i++) {
        if (i % 6 == 0) {
            j++;
            this.tempFormatted[j] = [];
            this.tempFormatted[j].push(slides[i]);
        }
        else {
            this.tempFormatted[j].push(slides[i]);
        }
    }
    return this.tempFormatted;
  }
}
