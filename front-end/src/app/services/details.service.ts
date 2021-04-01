import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { media } from "../components/child-id/child-id.component"
import { video } from "../components/youtube/youtube.component"

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient: HttpClient) { }
  getDetails(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id;
    return this.httpClient.get<media>(url);
  }
  getVideo(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/video/"+id;
    return this.httpClient.get<video>(url);
  }
}
