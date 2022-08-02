import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/core/models/course/course';

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
  constructor(private fb: FormBuilder) {
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

  createCourse(course: Course): void {
    console.log(course)
  }
}
