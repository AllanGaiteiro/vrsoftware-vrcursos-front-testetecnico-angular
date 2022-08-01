import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routes';

import { CoursesComponent } from './pages/courses/courses.component';
import { StudentsComponent } from './pages/students/students.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    CoursesComponent,
    StudentsComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AdminRoutes)
  ],
  exports:[SharedModule],
})
export class AdminModule { }
