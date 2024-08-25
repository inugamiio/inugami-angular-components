import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGoogleAnalyticsModule,NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

//-----------
import { InugamiBreakingNewsModule } from 'inugami-components/breaking-news';
import { InugamiClockModule } from 'inugami-components/clock';
import { InugamiCodeModule } from 'inugami-components/code';
import { InugamiIconModule } from 'inugami-components/icon';
import { InugamiMenuLinksModule } from 'inugami-components/menu-links';
import { InugamiSwitzerlandModule } from 'inugami-components/svg-switzerland';
import { InugamiSvgTimelineModule } from 'inugami-components/svg-timeline';
import { InugamiServiceModule } from 'inugami-components/service';
//-----------

import { HomePage } from './views/home/home.page';
import { ClockView } from './views/components/clock/clock.view';
import { IconView } from './views/icons/icons.view';
import { TimelinePage } from './views/svg/timeline/timeline.page';

import { CodeView } from './views/components/code/code.view';
import { BreakingNewsView } from './views/components/breaking-news/breaking-news.view';
import { SwitzerlandPage } from './views/svg/switzerland/switzerland.page';





@NgModule({
  declarations: [
    AppComponent,
    BreakingNewsView,
    ClockView,
    CodeView,
    HomePage,
    IconView,
    SwitzerlandPage,
    TimelinePage
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGoogleAnalyticsModule.forRoot('G-1683HZCMDJ'),
    NgxGoogleAnalyticsRouterModule,

    // --- 
    InugamiBreakingNewsModule,
    InugamiClockModule,
    InugamiCodeModule,
    InugamiIconModule,
    InugamiMenuLinksModule,
    InugamiSwitzerlandModule,
    InugamiSvgTimelineModule,
    InugamiServiceModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
