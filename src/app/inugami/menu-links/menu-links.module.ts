import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuLinksComponent } from './menu-links.component';


@NgModule({
  declarations: [
    MenuLinksComponent
  ],
  exports :[
    MenuLinksComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class InugamiMenuLinksModule { }
