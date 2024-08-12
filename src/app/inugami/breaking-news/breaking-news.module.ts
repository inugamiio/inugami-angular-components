import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InuCodeComponent } from './breaking-news.component';
import { InugamiIconModule } from 'inugami-components/icon';

@NgModule({
  declarations: [
    InuCodeComponent
  ],
  exports :[
    InuCodeComponent
  ],
  imports: [
    BrowserModule,
    InugamiIconModule
  ]
})
export class InugamiBreakingNewsModule { }
