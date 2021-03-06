import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, catchError  } from 'rxjs/operators';
import { SearchService } from "../../services/search.service"
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

export interface Media{
  id: number;
  name: string;
  media_type: string;
  backdrop_path: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public query: string = '';
  public activePage = 1;
  public searchResult: Media[] = [];
  public isMenuCollapsed = true;
  constructor(private searchService: SearchService, 
              private router: Router) { }

  ngOnInit(): void {
    console.log(document.URL)
    if(document.URL.indexOf('watch') !== -1){
      this.activePage = 3;
    }else if(document.URL.indexOf('mylist') !== -1){
      this.activePage = 2;
    }else{
      this.activePage = 1;
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((query) => this.fetchSearchResult(query))
    )

  formatter = (x: {name: string}) => x.name;

  fetchSearchResult(query: string){
    this.searchService.get7Matches(query).subscribe(res => {
      this.searchResult = Object.values(res)[0];
    })
    return this.searchResult;
  }

  viewSearchResultDetail(event: any, media_type: string, id: number){
    // this.router.navigate(['/watch/', {media_type: media_type, id: id}]);
    // this.router.navigateByUrl('/watch/'+media_type+'/'+id);
    document.location.href = '/watch/'+media_type+'/'+id;
  }

}

