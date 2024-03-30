import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MenuLinksComponent } from './menu-links/menu-links.component';
import { TimelineComponent } from './timeline/timeline.component';



@NgModule({
  declarations: [
    MenuLinksComponent,
    TimelineComponent
  ],
  exports:[
    MenuLinksComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
})
export class InugamiComponentsModule { }
