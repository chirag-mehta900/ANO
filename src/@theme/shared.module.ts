import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NbProgressBarModule } from '@nebular/theme';

const NB_Module = [
  NgbModule,
  MatProgressBarModule,
  NbProgressBarModule
  ];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule, ...NB_Module],
  providers: [],
})
export class SharedModule {}
