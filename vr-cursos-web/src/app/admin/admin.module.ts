import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routes';

import { StudentsComponent } from './pages/students/students.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseViewComponent } from './pages/courses/course-view/course-view.component';
import { CourseCreateComponent } from './pages/courses/course-create/course-create.component';




@NgModule({
  declarations: [
    StudentsComponent,
    RegistrationComponent,
    CourseListComponent,
    CourseViewComponent,
    CourseCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [SharedModule],
})
export class AdminModule { }
