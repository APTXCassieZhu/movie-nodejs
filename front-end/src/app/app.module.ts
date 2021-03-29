import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MoviepageComponent } from './components/moviepage/moviepage.component';
import { TvpageComponent } from './components/tvpage/tvpage.component';
import { MylistpageComponent } from './components/mylistpage/mylistpage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChildIdComponent } from './components/child-id/child-id.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MoviepageComponent,
    TvpageComponent,
    MylistpageComponent,
    NavBarComponent,
    ChildIdComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
