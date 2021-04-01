import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MylistpageComponent } from './components/mylistpage/mylistpage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChildIdComponent } from './components/child-id/child-id.component';
import { SlideListComponent } from './components/slide-list/slide-list.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { CastComponent } from './components/cast/cast.component';
import { ReviewComponent } from './components/review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MylistpageComponent,
    NavBarComponent,
    ChildIdComponent,
    SlideListComponent,
    YoutubeComponent,
    CastComponent,
    ReviewComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
    FontAwesomeModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
