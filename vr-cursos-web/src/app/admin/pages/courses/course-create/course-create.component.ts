import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course } from 'src/app/core/models/course/course';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  formFields: { name: string, value: string }[];
  formGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formGroup = this.createFormCourse(new Course());
    this.formFields = [
      { name: 'descricao', value: 'Descrição' },
      { name: 'ementa', value: 'Ementa' }
    ];
  }
  ngOnInit(): void {
  }

  createFormCourse(course: Course) {

    return this.fb.group({
      descricao: new FormControl(course?.descricao ?? '', [Validators.required]),
      ementa: new FormControl(course?.ementa ?? '', [Validators.required])
    })
  }

  createCourse(){
    
  }
}
