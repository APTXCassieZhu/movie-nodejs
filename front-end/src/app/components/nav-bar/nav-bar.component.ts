import { Component, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, catchError  } from 'rxjs/operators';
import { SearchService } from "../../services/search.service"
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

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
  public activePage = "1";
  public searchResult: Media[] = [];
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
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
    console.log(this.searchResult);
    return this.searchResult;
  }
}

