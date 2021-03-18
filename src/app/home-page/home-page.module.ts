import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomePageRoutingModule } from "./home-page-routing.module";
import { HomePageComponent } from "./home-page.component";
import { HomeDetailsComponent } from "./home-details/home-details.component";
import { SelectDeviceComponent } from "./select-device/select-device.component";
import { SelectIssueComponent } from "./select-issue/select-issue.component";
import { SharedModule } from "src/@theme/shared.module";

@NgModule({
  declarations: [
    HomePageComponent,
    HomeDetailsComponent,
    SelectDeviceComponent,
    SelectIssueComponent,
  ],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
})
export class HomePageModule {}
