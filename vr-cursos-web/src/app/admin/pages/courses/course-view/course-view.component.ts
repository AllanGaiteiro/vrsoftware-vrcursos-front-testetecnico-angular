import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/models/course/course';
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
  course!: Course;
  courseCodigo: number;
  courseSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: CourseService, private activedRouter: ActivatedRoute) {
    this.courseCodigo = this.activedRouter.snapshot.params['codigo'];
    this.formGroup = new FormGroup({});
    this.formFields = [
      { name: 'descricao', value: 'Descrição', type: 'input' },
      { name: 'ementa', value: 'Ementa', type: 'textarea' }
    ];
  }

  ngOnInit(): void {
    // Course Find One
    this.courseSubscription = this.service.findOne(this.courseCodigo).subscribe((res) => {
      this.course = res;
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
      descricao: new FormControl(this.course?.descricao ?? '', [Validators.required]),
      ementa: new FormControl(this.course?.ementa ?? '', [Validators.required])
    })
  }

  async updateCourse(course: Course): Promise<void> {
    try {
      console.log('Course Update - Success');
      await this.service.update(this.courseCodigo, course);
    } catch (error) {
      console.error('Course Update - Error ocurred', error);
    }
  }

}
