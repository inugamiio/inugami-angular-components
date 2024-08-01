import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InugamiIconModule } from 'inugami-components/icon';
import { InugamiMenuLinksModule } from 'inugami-components/menu-links';


import { HomePage } from './views/home/home.page';
import { IconView } from './views/icons/icons.view';
import { TimelinePage } from './views/svg/timeline/timeline.page';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    IconView,
    TimelinePage
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // --- 
    InugamiIconModule,
    InugamiMenuLinksModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
