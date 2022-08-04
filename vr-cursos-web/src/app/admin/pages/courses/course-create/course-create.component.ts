import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/core/models/course/course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  formFields: {
    name: string, value: string, type: string
  }[];
  formGroup: FormGroup;
  course?: Course;
  constructor(
    private fb: FormBuilder,
    private service: CourseService) {
    this.formGroup = this.createFormCourse(new Course());
    this.formFields = [
      { name: 'descricao', value: 'Descrição', type: 'input' },
      { name: 'ementa', value: 'Ementa', type: 'textarea' }
    ];
  }
  ngOnInit(): void {
  }

  createFormCourse(course: Course): FormGroup {
    return this.fb.group({
      descricao: new FormControl(course?.descricao ?? '', [Validators.required]),
      ementa: new FormControl(course?.ementa ?? '', [Validators.required])
    })
  }

  async createCourse(course: Course): Promise<void> {
    try {
      console.log('Course Create - Success');
      await this.service.create(course);
    } catch (error) {
      console.error('Course Create - Error ocurred', error);
    }
  }
}
