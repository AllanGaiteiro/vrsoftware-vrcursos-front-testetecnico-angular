import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StudentsComponent } from './pages/students/students.component';

export const AdminRoutes: Routes = [
  {
    path: 'cursos',
    component: CoursesComponent
  },
  {
    path: 'alunos',
    component: StudentsComponent
  },
  {
    path: 'registros',
    component: RegistrationComponent
  },
];
