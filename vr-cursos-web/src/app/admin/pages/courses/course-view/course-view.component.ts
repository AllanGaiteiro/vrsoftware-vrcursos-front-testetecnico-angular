import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {
  formFields: {
    name: string, value: string, type: string
  }[];
  formGroup: FormGroup;
  course!: CourseEntity;
  courseId: number;
  courseSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: CourseService, private activedRouter: ActivatedRoute) {
    this.courseId = this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
    this.formFields = [
      { name: 'description', value: 'Descrição', type: 'input' },
      { name: 'menu', value: 'Ementa', type: 'textarea' }
    ];
  }

  ngOnInit(): void {
    // Course Find One
    this.courseSubscription = this.service.findOne(this.courseId).subscribe((course) => {
      this.course = course;
      this.createFormCourse();
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
  }

  createFormCourse(): void {
    this.formGroup = this.fb.group({
      description: new FormControl(this.course?.description ?? '', [Validators.required]),
      menu: new FormControl(this.course?.menu ?? '', [Validators.required])
    })
  }

  async updateCourse(course: Partial<CourseEntity>): Promise<void> {
    try {
      console.log('Course Update - Success');
      await this.service.update(this.courseId, course);
    } catch (error) {
      console.error('Course Update - Error ocurred', error);
    }
  }

}
