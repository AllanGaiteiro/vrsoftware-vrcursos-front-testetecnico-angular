import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavCardComponent } from './sidenav-card/sidenav-card.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { StudentsComponent } from './pages/students/students.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminRoutes } from './admin.routes';



@NgModule({
  declarations: [
    SidenavCardComponent,
    CoursesComponent,
    StudentsComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
