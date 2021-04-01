import { Component, OnInit } from '@angular/core';

import { smallSlide } from '../homepage/homepage.component';

@Component({
  selector: 'app-mylistpage',
  templateUrl: './mylistpage.component.html',
  styleUrls: ['./mylistpage.component.css']
})
export class MylistpageComponent implements OnInit {
  public watch_list: smallSlide[] = [];
  // public format_watch_list: smallSlide[][] = [];
  public fomatted : any;
  constructor() { }

  ngOnInit(): void {
    this.watch_list = JSON.parse(window.localStorage.getItem('watch_list') || "[]");
    // this.format_watch_list = this.format(this.watch_list);
  }

  // format(slides: smallSlide[]){
  //   this.fomatted = [];
  //   var j = -1;

  //   for (var i = 0; i < slides.length; i++) {
  //       if (i % 6 == 0) {
  //           j++;
  //           this.fomatted[j] = [];
  //           this.fomatted[j].push(slides[i]);
  //       }
  //       else {
  //           this.fomatted[j].push(slides[i]);
  //       }
  //   }
  //   return this.fomatted;
  // }
}
