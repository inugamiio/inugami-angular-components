import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InugamiIconModule } from 'inugamiio/icon';

import { InugamiViewsModule } from './views/inugami-views.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // --- modules 
    InugamiViewsModule,
    NgbModule,

    // --- 
    InugamiIconModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
