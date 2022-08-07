import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  courses?: CourseEntity[];
  constructor(private service: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    // Course Find
    this.getCourses();
  }

  // Get Data
  async getCourses(): Promise<void> {
    try {
      const courses = await this.service.find();
      if (courses.length > 0) {
        this.courses = courses;
      }
    } catch (error) {
      console.error('Course Find - Error ocurred - ', error)
    }
  }

  onDelete(id: number) {
    this.service.delete(id)
  }

  onRedirect(id: number) {
    this.router.navigate([`/cursos/ver/${id}`])
  }
}
