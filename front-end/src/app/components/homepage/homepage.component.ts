import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SlideService } from "../../services/slide.service"


export interface slide{
  id: number;
  title: string;
  backdrop_path: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public now_play: slide[] = [];
  public title1: string = 'Continue Watching';
  public title2: string = 'Popular Movies';
  public title3: string = 'Top Rated Movies';
  public title4: string = 'Trending Movies';
  public title5: string = 'Popular TV Shows';
  public title6: string = 'Top Rated TV Shows';
  public title7: string = 'Trending TV Shows';
  
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private slideService: SlideService) { }

  ngOnInit(): void {
    this.slideService.getNowPlaying().subscribe(res => {
      this.now_play = Object.values(res)[0];
      console.log(this.now_play);
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
