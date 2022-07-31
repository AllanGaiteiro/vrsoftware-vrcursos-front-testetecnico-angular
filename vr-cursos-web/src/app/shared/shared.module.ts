import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ButtonComponent } from './button/button.component';
import { TableBasicComponent } from './table-basic/table-basic.component';
@NgModule({
  declarations: [
    TableBasicComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    TableBasicComponent,
    ButtonComponent
  ],
})
export class SharedModule { }
