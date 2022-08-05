import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/models/course/course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string, length: number }[] =
    [
      { name: 'codigo', value: "Codigo", length: 3 },
      { name: 'descricao', value: "Descrição", length: 7 },
      { name: 'actions', value: 'Ação', length: 2 }
    ];
  courseSubscription?: Subscription;
  displayedColumns: string[] = [];
  courses: Course[] = [];
  constructor(private service: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    // Course Find
    this.courseSubscription = this.service.find().subscribe((courses) => {
      this.courses = courses;
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })
    this.displayedColumns = this.getDisplayedColumns();
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
  }

  deleteCourse(codigo: number){
    this.service.delete(codigo)
  }

  redirectByRouter(codigo: number) {
    console.log(`/cursos/ver/${codigo}`)
    this.router.navigate([`/cursos/ver/${codigo}`])
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }
}
