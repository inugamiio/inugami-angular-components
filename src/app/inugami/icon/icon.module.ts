import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconComponent } from './icon.component';


@NgModule({
  declarations: [
    IconComponent
  ],
  exports :[
    IconComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class InugamiIconModule { }
