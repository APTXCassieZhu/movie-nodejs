import { Component, OnInit } from '@angular/core';

import { SmallSlide } from '../homepage/homepage.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-mylistpage',
  templateUrl: './mylistpage.component.html',
  styleUrls: ['./mylistpage.component.css']
})
export class MylistpageComponent implements OnInit {
  public watch_list: SmallSlide[] = [];
  public fomatted : any;
  mobile = false;
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.watch_list = JSON.parse(window.localStorage.getItem('watch_list') || "[]");
    this.resize();
  }

  resize(){
    if(this.breakpointObserver.isMatched('(max-width: 576px)')){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
}
