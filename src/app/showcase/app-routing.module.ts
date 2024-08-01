import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockView } from './views/components/clock/clock.view';
import { HomePage } from './views/home/home.page';
import { IconView } from './views/icons/icons.view';
import { TimelinePage } from './views/svg/timeline/timeline.page';


const routes: Routes = [
  {path: 'tools/icons', component: IconView},
  {path: 'components/clock', component: ClockView},
  {path: 'svg/timeline', component: TimelinePage},
  { path: "", component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
