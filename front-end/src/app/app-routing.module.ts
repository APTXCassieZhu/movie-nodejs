import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component'
import { MylistpageComponent } from './components/mylistpage/mylistpage.component'
import { ChildIdComponent } from './components/child-id/child-id.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {
    path: 'watch', 
    children: [
      {path: ':media_type/:id', component: ChildIdComponent},
    ]
  },
  {path: 'mylist', component: MylistpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
