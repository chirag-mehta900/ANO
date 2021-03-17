import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const NB_Module = [NgbModule];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule, ...NB_Module],
  providers: [],
})
export class SharedModule {}
