import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDetailsComponent } from './home-page/home-details/home-details.component';
import { MapComponent } from './map/map.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'shop', component: ShopComponent },
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
    path: 'home-page',
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
