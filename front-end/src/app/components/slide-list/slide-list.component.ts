import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})
export class SlideListComponent implements OnInit {
  @Input() componentTitle: string = 'Default Title';
  constructor() { }

  ngOnInit(): void {
  }

}
