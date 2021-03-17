import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderModuleComponent } from './header-module.component';

const routes: Routes = [{ path: '', component: HeaderModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderModuleRoutingModule { }
