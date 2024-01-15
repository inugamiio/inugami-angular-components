import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './views/home/home.page';
import { TimelinePage } from './views/timeline/timeline.page';


const routes: Routes = [
  {path: 'components/timeline', component: TimelinePage},
  { path: "", component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
