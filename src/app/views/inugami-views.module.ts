import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { InugamiCommonsModule } from '../commons/inugami-commons.module';
import { InugamiComponentsModule } from '../components/inugami-components.module';
import { HomePage } from './home/home.page';
import { TimelinePage } from './timeline/timeline.page';



@NgModule({
  declarations: [
    HomePage,
    TimelinePage
  ],
  exports:[
    HomePage,
    TimelinePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    //-----------------------
    InugamiCommonsModule,
    InugamiComponentsModule
  ],
  providers: [],
})
export class InugamiViewsModule { }
