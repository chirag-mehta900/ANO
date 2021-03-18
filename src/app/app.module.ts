import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { HeaderModuleModule } from './header-module/header-module.module';
import { SharedModule } from 'src/@theme/shared.module';
import { AgmCoreModule } from '@agm/core';
import { ShopComponent } from './shop/shop.component';
import { AddproductComponent } from './shop/addproduct/addproduct.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [AppComponent, FooterComponent, MapComponent, AboutComponent, ShopComponent, AddproductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModuleModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY',
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
