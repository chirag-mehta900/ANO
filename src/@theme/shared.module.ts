import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const NB_Module = [];
@NgModule({
  imports: [CommonModule, ...NB_Module],
  exports: [CommonModule],
  providers: [],
})
export class SharedModule {}
