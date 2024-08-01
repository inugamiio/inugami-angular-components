import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SvgTimelineComponent} from './svg-timeline.component';


@NgModule({
  declarations: [
    SvgTimelineComponent
  ],
  exports :[
    SvgTimelineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class InugamiSvgTimelineModule { }
