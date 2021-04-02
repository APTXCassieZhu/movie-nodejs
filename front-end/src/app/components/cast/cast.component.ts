import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DetailsService } from "../../services/details.service"
import { faImdb, faInstagram, faFacebookSquare, faTwitter } from '@fortawesome/free-brands-svg-icons'


export interface Cast{
  id: number,
  character: string,
  name: string,
  profile_path: string
}

export interface CastDetail{
  name: string,
  birthday: any,
  place_of_birth: any,
  gender: any,
  known_for_department: any,
  also_known_as: any,
  biography: any
}

export interface CastExternal{
  imdb_id: any,
  facebook_id: any,
  instagram_id: any,
  twitter_id: any
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
  public cur_cast: CastDetail = {} as CastDetail;
  public cur_share: CastExternal = {} as CastExternal;
  facebook = faFacebookSquare;
  twitter = faTwitter;
  ins = faInstagram;
  imdb = faImdb;
  constructor(private detailsService: DetailsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.detailsService.getCast(this.mediaId, this.mediaType).subscribe(res => {
      this.castList = Object.values(res)[0];
    })
  }
  viewCastDetail(content: any, castId: number) {
    this.modalService.open(content, { scrollable: true, size: 'lg'});
    this.detailsService.getCastDetail(castId).subscribe(res => {
      this.cur_cast = res;
      var len = res.also_known_as.length;
      var also = '';
      for(var i = 0; i < len; i++){
        if(i != 0){
          also += ',';
        }
        also += res.also_known_as[i];
      }
      this.cur_cast.also_known_as = also;
      if(this.cur_cast.gender == 1){
        this.cur_cast.gender = "Female";
      }else if(this.cur_cast.gender == 2){
        this.cur_cast.gender = "Male";
      }else{
        this.cur_cast.gender = "Undefined";
      }
    })
    this.detailsService.getCastShare(castId).subscribe(res => {
      this.cur_share = res;
      console.log(this.cur_share);
    })
  }
}
