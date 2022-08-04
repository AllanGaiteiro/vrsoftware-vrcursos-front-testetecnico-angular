import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
  courseSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: CourseService) {
    this.formGroup = new FormGroup({});
    this.formFields = [
      { name: 'descricao', value: 'Descrição', type: 'input' },
      { name: 'ementa', value: 'Ementa', type: 'textarea' }
    ];
  }

  ngOnInit(): void {
    // Course Find One
    this.courseSubscription = this.service.findOne(1).subscribe((res) => {
      this.course = res;
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })
    
    this.createFormCourse();
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
      await this.service.update(course.codigo,course);
    } catch (error) {
      console.error('Course Update - Error ocurred', error);
    }
  }

}
