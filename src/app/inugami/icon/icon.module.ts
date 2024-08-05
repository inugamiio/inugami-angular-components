import { CommonModule } from '@angular/common';
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
    CommonModule,
    BrowserModule
  ],
  providers: []
})
export class InugamiIconModule { }
