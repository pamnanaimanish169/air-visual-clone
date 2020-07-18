import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AqiComponent } from './aqi/aqi.component';
import { AqiService } from './aqi.service';

const appRoutes = [
  { path: '', redirectTo: 'aqi', pathMatch: 'full'},
  { path: 'aqi', component: AqiComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AqiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AqiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
