import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';

import { ButtonComponent } from './button/button.component';
import { TableBasicComponent } from './table-basic/table-basic.component';
import { Menu } from '../core/menu-admin/Menu';

@NgModule({
  declarations: [
    TableBasicComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    TableBasicComponent,
    ButtonComponent,
    MatIconModule
  ],
  providers:[Menu]
})
export class SharedModule { }
