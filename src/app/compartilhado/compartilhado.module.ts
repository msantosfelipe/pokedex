import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaiusculoPipe } from './pipe/maiusculo.pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ToastyModule.forRoot(),
  ],
  declarations: [
    MaiusculoPipe
  ],
  exports: [
    MaiusculoPipe,
    PaginationModule,
    FormsModule,
    ToastyModule
  ]
})
export class CompartilhadoModule { }
