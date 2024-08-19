import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakingNewsView } from './views/components/breaking-news/breaking-news.view';
import { ClockView } from './views/components/clock/clock.view';
import { CodeView } from './views/components/code/code.view';
import { HomePage } from './views/home/home.page';
import { IconView } from './views/icons/icons.view';
import { SwitzerlandPage } from './views/svg/switzerland/switzerland.page';
import { TimelinePage } from './views/svg/timeline/timeline.page';


const routes: Routes = [
  { path: 'tools/icons', component: IconView },
  { path: 'components/breaking-news', component: BreakingNewsView },
  { path: 'components/clock', component: ClockView },
  { path: 'components/code', component: CodeView },


  { path: 'svg/switzerland', component: SwitzerlandPage },
  { path: 'svg/timeline', component: TimelinePage },
  { path: "", component: HomePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
