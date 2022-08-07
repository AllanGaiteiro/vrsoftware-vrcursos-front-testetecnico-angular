import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss',
    '../../../../../styles/div-title.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] =
    DISPLAYED_COLUMNS['COURSE'];
  courseSubscription?: Subscription;
  courses?: CourseEntity[];
  constructor(private service: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    // Course Find
    this.courseSubscription = this.service.find().subscribe((courses) => {
      this.courses = courses;
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    });
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
  }

  onDelete(id: number) {
    this.service.delete(id)
  }

  onRedirect(id: number) {
    this.router.navigate([`/cursos/ver/${id}`])
  }
}
