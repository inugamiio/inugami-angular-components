import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//-----------
import { InugamiClockModule } from 'inugami-components/clock';
import { InugamiCodeModule } from 'inugami-components/code';
import { InugamiIconModule } from 'inugami-components/icon';
import { InugamiMenuLinksModule } from 'inugami-components/menu-links';
import { InugamiSvgTimelineModule } from 'inugami-components/svg-timeline';
import { InugamiServiceModule } from 'inugami-components/service';
//-----------

import { HomePage } from './views/home/home.page';
import { ClockView } from './views/components/clock/clock.view';
import { IconView } from './views/icons/icons.view';
import { TimelinePage } from './views/svg/timeline/timeline.page';
import { CommonModule } from '@angular/common';
import { CodeView } from './views/components/code/code.view';



@NgModule({
  declarations: [
    AppComponent,
    ClockView,
    CodeView,
    HomePage,
    IconView,
    TimelinePage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // --- 
    InugamiClockModule,
    InugamiCodeModule,
    InugamiIconModule,
    InugamiMenuLinksModule,
    InugamiSvgTimelineModule,
    InugamiServiceModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
