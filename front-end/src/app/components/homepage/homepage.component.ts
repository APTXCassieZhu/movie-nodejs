import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SlideService } from "../../services/slide.service"


export interface slide{
  id: number;
  title: string;
  backdrop_path: string;
}

export interface smallSlide{
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public now_play: slide[] = [];
  public continue_watch: smallSlide[][] = [];
  public popular_movies: smallSlide[][] = [];
  public toprated_movies: smallSlide[][] = [];
  public trending_movies: smallSlide[][] = [];
  public popular_tv: smallSlide[][] = [];
  public toprated_tv: smallSlide[][] = [];
  public trending_tv: smallSlide[][] = [];
  public title1: string = 'Continue Watching';
  public title2: string = 'Popular Movies';
  public title3: string = 'Top Rated Movies';
  public title4: string = 'Trending Movies';
  public title5: string = 'Popular TV Shows';
  public title6: string = 'Top Rated TV Shows';
  public title7: string = 'Trending TV Shows';
  tempFormatted : any[] = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.getNowPlaying().subscribe(res => {
      this.now_play = Object.values(res)[0];
    })
    this.slideService.getPopularMovies().subscribe(res => {
      this.popular_movies = this.format(Object.values(res)[0]);
    })
    this.slideService.getTopratedMovies().subscribe(res => {
      this.toprated_movies = this.format(Object.values(res)[0]);
    })
    this.slideService.getTrendingMovies().subscribe(res => {
      this.trending_movies = this.format(Object.values(res)[0]);
    })
    this.slideService.getPopularTV().subscribe(res => {
      this.popular_tv = this.format(Object.values(res)[0]);
    })
    this.slideService.getTopratedTV().subscribe(res => {
      this.toprated_tv = this.format(Object.values(res)[0]);
    })
    this.slideService.getTrendingTV().subscribe(res => {
      this.trending_tv = this.format(Object.values(res)[0]);
    })
  }

  @ViewChild('carousel', {static : true}) carousel: any;
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  format(slides: smallSlide[]){
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
