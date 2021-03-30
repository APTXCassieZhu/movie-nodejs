import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { smallSlide } from '../homepage/homepage.component';


@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})
export class SlideListComponent implements OnInit {
  @Input() componentTitle: string = 'Default Title';
  @Input() slides: smallSlide[][] = [];
  @Input() slideSum: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
