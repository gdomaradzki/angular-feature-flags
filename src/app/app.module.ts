import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FeatureFlagsModule } from '@core/feature-flags/feature-flags.module';
import { HomeComponent } from './home/home.component';
import { RedComponent } from './red/red.component';
import { BlueComponent } from './blue/blue.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, RedComponent, BlueComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureFlagsModule.forRoot({
      home: {
        red_button: true,
        blue_button: false,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
