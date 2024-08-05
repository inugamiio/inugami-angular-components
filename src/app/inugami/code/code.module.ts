import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InuCodeComponent } from './code.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
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
    HighlightModule,
    InugamiIconModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbers: true
      }
    }
  ]
})
export class InugamiCodeModule { }
