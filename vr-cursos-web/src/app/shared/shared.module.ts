import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBasicComponent } from './table-basic/table-basic.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    TableBasicComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    TableBasicComponent
  ],
})
export class SharedModule { }
