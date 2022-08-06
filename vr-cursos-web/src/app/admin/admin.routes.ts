import { Routes } from '@angular/router';
import { CourseCreateComponent } from './pages/courses/course-create/course-create.component';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseViewComponent } from './pages/courses/course-view/course-view.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StudentCreateComponent } from './pages/students/student-create/student-create.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentViewComponent } from './pages/students/student-view/student-view.component';

export const AdminRoutes: Routes = [
  {
    path: 'cursos',
    children: [
      {
        path: 'listar',
        component: CourseListComponent
      },
      {
        path: 'ver/:id',
        component: CourseViewComponent
      },
      {
        path: 'criar',
        component: CourseCreateComponent
      },
    ]
  },
  {
    path: 'alunos',
    children: [
      {
        path: 'listar',
        component: StudentListComponent
      },
      {
        path: 'ver/:id',
        component: StudentViewComponent
      },
      {
        path: 'criar',
        component: StudentCreateComponent
      },
    ]
  },
  {
    path: 'registros',
    children: [
      {
        path: 'listar',
        component: RegistrationComponent
      }
    ]
  }
];
