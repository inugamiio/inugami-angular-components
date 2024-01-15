import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InugamiCommonsModule } from './commons/inugami-commons.module';
import { InugamiComponentsModule } from './components/inugami-components.module';
import { InugamiViewsModule } from './views/inugami-views.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // --- modules 
    InugamiCommonsModule,
    InugamiComponentsModule,
    InugamiViewsModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
