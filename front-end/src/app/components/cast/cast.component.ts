import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from "../../services/details.service"


export interface Cast{
  id: number,
  character: string,
  name: string,
  profile_path: string
}

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() mediaId: any;
  @Input() mediaType: any;
  public castList: Cast[] = [];
  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.detailsService.getCast(this.mediaId, this.mediaType).subscribe(res => {
      this.castList = Object.values(res)[0];
      console.log(this.castList);
    })
  }

}
