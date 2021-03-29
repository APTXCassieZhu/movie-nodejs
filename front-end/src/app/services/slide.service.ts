import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private httpClient: HttpClient) { }

  getNowPlaying(){
    let url = "http://localhost:8080/slide/now_playing";
    return this.httpClient.get(url);
  }
}
