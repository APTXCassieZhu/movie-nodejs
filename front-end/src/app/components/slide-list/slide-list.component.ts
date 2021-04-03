import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SmallSlide } from '../homepage/homepage.component';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})

export class SlideListComponent implements OnInit {
  @Input() componentTitle: string = 'Default Title';
  @Input() slides: SmallSlide[][] = [];
  @Input() slideSum: number = 0;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    // mobie mode
    // if(this.breakpointObserver.isMatched('(max-width: 599px)')){

    // }
    if(window.screen.width <= 599){

    }
  }

}
