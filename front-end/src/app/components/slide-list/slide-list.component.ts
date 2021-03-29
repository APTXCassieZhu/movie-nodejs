import { Component, Input, OnInit } from '@angular/core';
import { smallSlide } from '../homepage/homepage.component';


@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})
export class SlideListComponent implements OnInit {
  @Input() componentTitle: string = 'Default Title';
  @Input() slides: smallSlide[][] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
