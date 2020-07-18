import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AqiComponent } from './aqi/aqi.component';
import { AqiService } from './aqi.service';

@NgModule({
  declarations: [
    AppComponent,
    AqiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AqiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
