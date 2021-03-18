<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
=======
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
>>>>>>> 1988092cfa07d808b476d64815783e6c19a1353f

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FooterComponent } from "./footer/footer.component";
import { MapComponent } from "./map/map.component";
import { AboutComponent } from "./about/about.component";
import { HeaderModuleModule } from "./header-module/header-module.module";
import { SharedModule } from "src/@theme/shared.module";
import { AgmCoreModule } from "@agm/core";
import { ShopComponent } from "./shop/shop.component";
import { AddproductComponent } from "./shop/addproduct/addproduct.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CustomHttpInterceptor } from "src/@theme/interceptor/httpinterceptor";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MapComponent,
    AboutComponent,
    ShopComponent,
    AddproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModuleModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY",
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
