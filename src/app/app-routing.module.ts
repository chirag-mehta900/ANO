import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { MappageComponent } from './mappage/mappage.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'map', component: MappageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: '',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'header',
    loadChildren: () =>
      import('./header-module/header-module.module').then(
        (m) => m.HeaderModuleModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'header-module',
    loadChildren: () =>
      import('./header-module/header-module.module').then(
        (m) => m.HeaderModuleModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
