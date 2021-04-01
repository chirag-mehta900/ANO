import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";
import { MappageComponent } from "./mappage/mappage.component";
import { PolicyComponent } from "./policy/policy.component";
import { ShopComponent } from "./shop/shop.component";
import { TrackingComponent } from "./tracking/tracking.component";
import { TrackingmapComponent } from "./trackingmap/trackingmap.component";

const routes: Routes = [
  { path: "map", component: MappageComponent },
  { path: "shop", component: ShopComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "about", component: AboutComponent },
  { path: "tracking", component: TrackingComponent },
  { path: "trackmap", component: TrackingmapComponent },
  { path: "cart", component: CartComponent },
  { path: "contact", component: ContactComponent },
  { path: "term", component: PolicyComponent },

  {
    path: "",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomePageModule),
  },
  {
    path: "header",
    loadChildren: () =>
      import("./header-module/header-module.module").then(
        (m) => m.HeaderModuleModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomePageModule),
  },
  {
    path: "header-module",
    loadChildren: () =>
      import("./header-module/header-module.module").then(
        (m) => m.HeaderModuleModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  { path: "**", pathMatch: "full", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
