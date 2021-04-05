import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  get7Matches(query: string){
    let url = "https://ruiqi571.wl.r.appspot.com/search/"+query;
    return this.httpClient.get(url);
  }
}
