import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { MediaDetail } from "../components/child-id/child-id.component"
import { CastDetail, CastExternal } from "../components/cast/cast.component"
import { Video } from "../components/youtube/youtube.component"
import { Review } from "../components/review/review.component"

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient: HttpClient) { }
  getDetails(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id;
    return this.httpClient.get<MediaDetail>(url);
  }
  getVideo(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/video/"+id;
    return this.httpClient.get<Video>(url);
  }
  getCast(id: string, media_type: string){
    let url = "http://localhost:8080/cast/"+media_type+"/"+id;
    return this.httpClient.get(url);
  }
  getCastDetail(id: number){
    let url = "http://localhost:8080/cast/"+id;
    return this.httpClient.get<CastDetail>(url);
  }
  getCastShare(id: number){
    let url = "http://localhost:8080/cast/"+id+"/ex/share";
    return this.httpClient.get<CastExternal>(url);
  }
  getReview(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id+"/reviews";
    return this.httpClient.get<Review[]>(url);
  }
}
