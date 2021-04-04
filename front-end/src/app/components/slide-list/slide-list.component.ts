import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SmallSlide } from '../homepage/homepage.component';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})

export class SlideListComponent implements OnInit {
  @Input() componentTitle: string = 'Default Title';
  @Input() slides: SmallSlide[] = [];
  @Input() slideSum: number = 0;
  formattedSlides: SmallSlide[][] = [];
  tempFormatted : any[] = [];
  showNavigationIndicators = true;
  mobile = false;
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.resize();
  }

  ngOnChanges(): void {
    this.resize();
  }
  
  resize(){
    if(this.breakpointObserver.isMatched('(max-width: 576px)')){
      this.formattedSlides = this.format(this.slides);
      this.showNavigationIndicators = false;
      this.mobile = true;
    }else if(this.breakpointObserver.isMatched('(max-width: 768px)')){
      this.formattedSlides = this.format4(this.slides);
      this.showNavigationIndicators = true;
      this.mobile = false;
    }else{
      this.formattedSlides = this.format6(this.slides);
      this.showNavigationIndicators = true;
      this.mobile = false;
    }
  }

  format6(slides: SmallSlide[]){
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
  format4(slides: SmallSlide[]){
    this.tempFormatted = [];
    var j = -1;

    for (var i = 0; i < slides.length; i++) {
        if (i % 4 == 0) {
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

  format(slides: SmallSlide[]){
    this.tempFormatted = [];
    var j = -1;

    for (var i = 0; i < slides.length; i++) {
        if (i % 1 == 0) {
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
