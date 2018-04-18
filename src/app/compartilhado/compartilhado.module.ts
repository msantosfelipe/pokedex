import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaiusculoPipe } from './pipe/maiusculo.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ToastyModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  declarations: [
    MaiusculoPipe
  ],
  exports: [
    MaiusculoPipe,
    PaginationModule,
    FormsModule,
    ToastyModule,
    ProgressbarModule
  ]
})
export class CompartilhadoModule { }
