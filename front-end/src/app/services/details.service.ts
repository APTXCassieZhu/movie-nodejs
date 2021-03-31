import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private httpClient: HttpClient) { }
  getVideo(id: string, media_type: string){
    let url = "http://localhost:8080/"+media_type+"/"+id;
    return this.httpClient.get(url);
  }
}
