import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/models/course/course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string }[] =
    [
      { name: 'codigo', value: "Codigo" },
      { name: 'descricao', value: "Descrição" },
    ];
  courseSubscription?: Subscription;
  displayedColumns: string[] = [];
  dataSource: Course[] = [];
  constructor(private service: CourseService) {
  }

  ngOnInit(): void {
    // Course Find
    this.courseSubscription = this.service.find().subscribe((res) => {
      this.dataSource = res;
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
  }

}
