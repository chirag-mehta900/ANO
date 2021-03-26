import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HeaderModuleModule } from './header-module/header-module.module';
import { SharedModule } from 'src/@theme/shared.module';
import { AgmCoreModule } from '@agm/core';
import { ShopComponent } from './shop/shop.component';
import { AddproductComponent } from './shop/addproduct/addproduct.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/@theme/interceptor/httpinterceptor';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MapService } from 'src/@theme/Services/map.service';
import { MappageComponent } from './mappage/mappage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingmapComponent } from './trackingmap/trackingmap.component';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AboutComponent,
    ShopComponent,
    AddproductComponent,
    MappageComponent,
    CheckoutComponent,
    TrackingComponent,
    TrackingmapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModuleModule,
    GooglePlaceModule,
    SharedModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY',
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    MapService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
