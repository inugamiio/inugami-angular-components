import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { IconComponent } from './components/icon/icon.component';



@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    IconComponent
  ],
  providers: [],
})
export class InugamiCommonsModule { }