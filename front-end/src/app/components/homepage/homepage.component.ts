import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SlideService } from "../../services/slide.service"
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


export interface Slide{
  id: number;
  title: string;
  backdrop_path: string;
}

export interface SmallSlide{
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
  public now_play: Slide[] = [];
  public continue_watch: SmallSlide[] = [];
  public popular_movies: SmallSlide[] = [];
  public toprated_movies: SmallSlide[] = [];
  public trending_movies: SmallSlide[] = [];
  public popular_tv: SmallSlide[] = [];
  public toprated_tv: SmallSlide[] = [];
  public trending_tv: SmallSlide[] = [];
  public title1: string = 'Continue Watching';
  public title2: string = 'Popular Movies';
  public title3: string = 'Top Rated Movies';
  public title4: string = 'Trending Movies';
  public title5: string = 'Popular TV Shows';
  public title6: string = 'Top Rated TV Shows';
  public title7: string = 'Trending TV Shows';
  public sum1: number = 0;
  public sum2: number = 0;
  public sum3: number = 0;
  public sum4: number = 0;
  public sum5: number = 0;
  public sum6: number = 0;
  public sum7: number = 0;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = true;
  constructor(private slideService: SlideService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    if(this.breakpointObserver.isMatched('(max-width: 576px)')){
      this.showNavigationIndicators = false;
    }else if(this.breakpointObserver.isMatched('(max-width: 768px)')){
      this.showNavigationIndicators = true;
    }else{
      this.showNavigationIndicators = true;
    }


    this.slideService.getNowPlaying().subscribe(res => {
      this.now_play = Object.values(res)[0];
    })
    var continue_list = JSON.parse(window.localStorage.getItem('continue_list') || "[]");
    this.continue_watch = continue_list;
    this.sum1 = continue_list.length;

    this.slideService.getPopularMovies().subscribe(res => {
      this.sum2 = Object.values(res)[0].length;
      this.popular_movies = Object.values(res)[0];
    })
    this.slideService.getTopratedMovies().subscribe(res => {
      this.sum3 = Object.values(res)[0].length;
      this.toprated_movies = Object.values(res)[0];
    })
    this.slideService.getTrendingMovies().subscribe(res => {
      this.sum4 = Object.values(res)[0].length;
      this.trending_movies = Object.values(res)[0];
    })
    this.slideService.getPopularTV().subscribe(res => {
      this.sum5 = Object.values(res)[0].length;
      this.popular_tv = Object.values(res)[0];
    })
    this.slideService.getTopratedTV().subscribe(res => {
      this.sum6 = Object.values(res)[0].length;
      this.toprated_tv = Object.values(res)[0];
    })
    this.slideService.getTrendingTV().subscribe(res => {
      this.sum7 = Object.values(res)[0].length;
      this.trending_tv = Object.values(res)[0];
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

}
