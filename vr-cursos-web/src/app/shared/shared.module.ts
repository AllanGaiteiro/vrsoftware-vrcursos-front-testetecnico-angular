import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';

import { ButtonComponent } from './button/button.component';
import { TableBasicComponent } from './table-basic/table-basic.component';
import { FormCoursesComponent } from './form-basic/form-basic.component';

import { Menu } from '../core/menu-admin/Menu';
import { DialogComfirmComponent } from './dialog-comfirm/dialog-comfirm.component';

@NgModule({
  declarations: [
    TableBasicComponent,
    ButtonComponent,
    FormCoursesComponent,
    DialogComfirmComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    TableBasicComponent,
    ButtonComponent,
    FormCoursesComponent,
  ],
  providers: [Menu]
})
export class SharedModule { }
