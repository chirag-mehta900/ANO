import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { CommonService } from "./Services/common.service";
import { HeaderService } from "./Services/header.service";
import { JwtTokenService } from "./services/jwt-token.service";
import { MapService } from "./Services/map.service";
import { StoreTokenService } from "./Services/store-token.service";

const NB_Module = [
  NgbModule,
  SlickCarouselModule,
  HttpClientModule,
  IvyCarouselModule,
  FormsModule,
  NgSelectModule,
  ReactiveFormsModule,
];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule, ...NB_Module],
  providers: [
    HeaderService,
    JwtTokenService,
    StoreTokenService,
    CommonService,
    MapService,
  ],
})
export class SharedModule {}
