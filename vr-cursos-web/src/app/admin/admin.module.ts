import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutes } from './admin.routes';

import { RegistrationComponent } from './pages/registration/registration.component';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseViewComponent } from './pages/courses/course-view/course-view.component';
import { CourseCreateComponent } from './pages/courses/course-create/course-create.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentViewComponent } from './pages/students/student-view/student-view.component';
import { StudentCreateComponent } from './pages/students/student-create/student-create.component';




@NgModule({
  declarations: [
    RegistrationComponent,
    CourseListComponent,
    CourseViewComponent,
    CourseCreateComponent,
    StudentListComponent,
    StudentViewComponent,
    StudentCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [SharedModule],
})
export class AdminModule { }
