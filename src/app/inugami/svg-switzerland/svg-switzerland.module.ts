import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InuSwitzerlandComponent } from './svg-switzerland.component';
@NgModule({
  declarations: [
    InuSwitzerlandComponent
  ],
  exports :[
    InuSwitzerlandComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class InugamiSwitzerlandModule { }
