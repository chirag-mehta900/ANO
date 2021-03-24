import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModuleRoutingModule } from './header-module-routing.module';
import { HeaderModuleComponent } from './header-module.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from 'src/@theme/shared.module';
import { BookRepairComponent } from './book-repair/book-repair.component';

@NgModule({
  declarations: [
    HeaderModuleComponent,
    LoginComponent,
    SignupComponent,
    BookRepairComponent,
  ],
  imports: [CommonModule, HeaderModuleRoutingModule, SharedModule],
  exports: [HeaderModuleComponent],
})
export class HeaderModuleModule {}
