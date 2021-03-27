import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-id',
  templateUrl: './child-id.component.html',
  styleUrls: ['./child-id.component.css']
})
export class ChildIdComponent implements OnInit {
  public id : any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
