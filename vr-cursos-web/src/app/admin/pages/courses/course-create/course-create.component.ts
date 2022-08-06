import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
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
  course?: CourseEntity;
  constructor(
    private fb: FormBuilder,
    private service: CourseService) {
    this.formGroup = this.createFormCourse(new CourseEntity());
    this.formFields = [
      { name: 'description', value: 'Descrição', type: 'input' },
      { name: 'menu', value: 'Ementa', type: 'textarea' }
    ];
  }
  ngOnInit(): void {
  }

  createFormCourse(course: CourseEntity): FormGroup {
    return this.fb.group({
      descricao: new FormControl(course?.description ?? '', [Validators.required]),
      ementa: new FormControl(course?.menu ?? '', [Validators.required])
    })
  }

  async createCourse(course: CourseEntity): Promise<void> {
    try {
      console.log('Course Create - Success');
      await this.service.create(course);
    } catch (error) {
      console.error('Course Create - Error ocurred', error);
    }
  }
}
