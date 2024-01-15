import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { TimelineComponent } from './timeline/timeline.component';



@NgModule({
  declarations: [
    TimelineComponent
  ],
  exports:[
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
})
export class InugamiComponentsModule { }
