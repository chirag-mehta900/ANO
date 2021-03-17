import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { HeaderModuleModule } from './header-module/header-module.module';
import { SharedModule } from 'src/@theme/shared.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, MapComponent, AboutComponent],
  imports: [BrowserModule, AppRoutingModule, HeaderModuleModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
