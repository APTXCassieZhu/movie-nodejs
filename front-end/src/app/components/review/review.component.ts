import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from "../../services/details.service"
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

export interface Review{
  author: any,
  content: any,
  created_at: any,
  url: any,
  author_details: AuthorDetails
}

export interface AuthorDetails{
  rating: any,
  avatar_path: any,
}
const MonthMap = ['0', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() mediaId: any;
  @Input() mediaType: any;
  public reviewList: Review[] = [];
  public reviewSum: number = 0;
  mobile = false;
  constructor(private detailsService: DetailsService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    // mobile
    if(this.breakpointObserver.isMatched('(max-width: 576px)')){
      this.mobile = true;
    }else{
      this.mobile = false;
    }


    this.detailsService.getReview(this.mediaId, this.mediaType).subscribe(res => {
      var len = res.length;
      if(len > 10){
        this.reviewList = res.slice(0,10);
      }else{
        this.reviewList = res;
      }
      this.reviewSum = this.reviewList.length;
      for(var i = 0; i < this.reviewSum; i++){
        if(this.reviewList[i].author_details.avatar_path == null){
          this.reviewList[i].author_details.avatar_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
        } else if(this.reviewList[i].author_details.avatar_path.indexOf('https') !== -1){
          this.reviewList[i].author_details.avatar_path = this.reviewList[i].author_details.avatar_path.substring(1);
        } else{
          this.reviewList[i].author_details.avatar_path = "https://image.tmdb.org/t/p/original" + this.reviewList[i].author_details.avatar_path;
        }
        var year = this.reviewList[i].created_at.substring(0, 4);
        var month = MonthMap[Number(this.reviewList[i].created_at.substring(5, 7))];
        var day = this.reviewList[i].created_at.substring(8, 10);
        var hour = Number(this.reviewList[i].created_at.substring(11, 13));
        var mm = 'AM';
        if(hour >= 12){
          mm = 'PM';
        }
        if(hour > 12){
          hour -= 12;
        }
        this.reviewList[i].created_at = month+' '+day+', '+year+', '+hour+this.reviewList[i].created_at.substring(13, 19)+' '+mm;
      }
    })
  }

}
