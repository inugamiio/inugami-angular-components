import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//-----------
import { InugamiIconModule } from 'inugami-components/icon';
import { InugamiMenuLinksModule } from 'inugami-components/menu-links';
import { InugamiSvgTimelineModule } from 'inugami-components/svg-timeline';
//-----------

import { HomePage } from './views/home/home.page';
import { ClockView } from './views/components/clock/clock.view';
import { IconView } from './views/icons/icons.view';
import { TimelinePage } from './views/svg/timeline/timeline.page';
import { InugamiClockModule } from '../inugami/clock/clock.module';


@NgModule({
  declarations: [
    AppComponent,
    ClockView,
    HomePage,
    IconView,
    TimelinePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // --- 
    InugamiClockModule,
    InugamiIconModule,
    InugamiMenuLinksModule,
    InugamiSvgTimelineModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
