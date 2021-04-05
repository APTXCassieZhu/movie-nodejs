import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(private httpClient: HttpClient) { }

  getNowPlaying(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/now_playing";
    return this.httpClient.get(url);
  }
  getPopularMovies(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/popular/movie";
    return this.httpClient.get(url);
  }
  getTopratedMovies(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/toprated/movie";
    return this.httpClient.get(url);
  }
  getTrendingMovies(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/trending/movie";
    return this.httpClient.get(url);
  }
  getPopularTV(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/popular/tv";
    return this.httpClient.get(url);
  }
  getTopratedTV(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/toprated/tv";
    return this.httpClient.get(url);
  }
  getTrendingTV(){
    let url = "https://ruiqi571.wl.r.appspot.com/slide/trending/tv";
    return this.httpClient.get(url);
  }

  getRecommend(id: string, media_type: string){
    let url = "https://ruiqi571.wl.r.appspot.com/"+media_type+"/"+id+"/recommend";
    return this.httpClient.get(url);
  }
  getSimilar(id: string, media_type: string){
    let url = "https://ruiqi571.wl.r.appspot.com/"+media_type+"/"+id+"/similar";
    return this.httpClient.get(url);
  }
}
