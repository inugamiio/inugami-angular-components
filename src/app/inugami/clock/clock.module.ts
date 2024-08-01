import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InuClockComponent } from './clock.component';


@NgModule({
  declarations: [
    InuClockComponent
  ],
  exports :[
    InuClockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class InugamiClockModule { }
