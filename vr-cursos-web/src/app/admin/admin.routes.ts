import { Routes } from '@angular/router';
import { CourseCreateComponent } from './pages/courses/course-create/course-create.component';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseViewComponent } from './pages/courses/course-view/course-view.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StudentsComponent } from './pages/students/students.component';

export const AdminRoutes: Routes = [
  {
    path: 'cursos',
    children: [
      {
        path: 'listar',
        component: CourseListComponent
      },
      {
        path: 'ver/:codigo',
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
        component: StudentsComponent
      }
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
