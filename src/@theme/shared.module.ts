import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

const NB_Module = [
  AgmCoreModule.forRoot({
    apiKey: '',
  }),
];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule],
  providers: [],
})
export class SharedModule {}
