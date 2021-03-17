import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { HeaderService } from "./Services/header.service";

const NB_Module = [
  NgbModule,
  SlickCarouselModule,
  HttpClientModule,
  IvyCarouselModule,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule, ...NB_Module],
  providers: [HeaderService],
})
export class SharedModule {}
