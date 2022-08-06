import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string, length: number }[] =
    [
      { name: 'id', value: "Codigo", length: 3 },
      { name: 'description', value: "Descrição", length: 7 },
      { name: 'actions', value: 'Ação', length: 2 }
    ];
  courseSubscription?: Subscription;
  displayedColumns: string[] = [];
  courses: CourseEntity[] = [];
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

  deleteCourse(id: number) {
    this.service.delete(id)
  }

  redirectByRouter(id: number) {
    console.log(`/cursos/ver/${id}`)
    this.router.navigate([`/cursos/ver/${id}`])
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }
}
