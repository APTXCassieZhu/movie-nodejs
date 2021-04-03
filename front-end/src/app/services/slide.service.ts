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
  getPopularMovies(){
    let url = "http://localhost:8080/slide/popular/movie";
    return this.httpClient.get(url);
  }
  getTopratedMovies(){
    let url = "http://localhost:8080/slide/toprated/movie";
    return this.httpClient.get(url);
  }
  getTrendingMovies(){
    let url = "http://localhost:8080/slide/trending/movie";
    return this.httpClient.get(url);
  }
  getPopularTV(){
    let url = "http://localhost:8080/slide/popular/tv";
    return this.httpClient.get(url);
  }
  getTopratedTV(){
    let url = "http://localhost:8080/slide/toprated/tv";
    return this.httpClient.get(url);
  }
  getTrendingTV(){
    let url = "http://localhost:8080/slide/trending/tv";
    return this.httpClient.get(url);
  }

  getRecommend(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id+"/recommend";
    return this.httpClient.get(url);
  }
  getSimilar(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id+"/similar";
    return this.httpClient.get(url);
  }
}
