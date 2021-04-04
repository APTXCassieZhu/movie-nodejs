import { Component, OnInit } from '@angular/core';

import { SmallSlide } from '../homepage/homepage.component';

@Component({
  selector: 'app-mylistpage',
  templateUrl: './mylistpage.component.html',
  styleUrls: ['./mylistpage.component.css']
})
export class MylistpageComponent implements OnInit {
  public watch_list: SmallSlide[] = [];
  public fomatted : any;
  
  constructor() { }

  ngOnInit(): void {
    this.watch_list = JSON.parse(window.localStorage.getItem('watch_list') || "[]");
  }
}
