import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InuBuildingComponent } from './svg-building.component';

@NgModule({
  declarations: [
    InuBuildingComponent
  ],
  exports :[
    InuBuildingComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class InugamiBuildingModule { }
