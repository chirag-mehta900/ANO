import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModuleRoutingModule } from './header-module-routing.module';
import { HeaderModuleComponent } from './header-module.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [HeaderModuleComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, HeaderModuleRoutingModule],
  exports: [HeaderModuleComponent],
})
export class HeaderModuleModule {}
