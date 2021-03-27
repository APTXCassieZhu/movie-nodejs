import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MylistComponent } from './mylist/mylist.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MoviepageComponent } from './components/moviepage/moviepage.component';
import { TvpageComponent } from './components/tvpage/tvpage.component';

@NgModule({
  declarations: [
    AppComponent,
    MylistComponent,
    HomepageComponent,
    MoviepageComponent,
    TvpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
