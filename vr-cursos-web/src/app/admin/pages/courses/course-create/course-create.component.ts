import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { FormField } from "src/app/core/models/common/FormField";
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss',
    '../../../../../styles/div-title.scss']
})
export class CourseCreateComponent implements OnInit {
  formFields: FormField[];
  formGroup: FormGroup;
  course?: CourseEntity;
  constructor(
    private fb: FormBuilder,
    private service: CourseService) {
    this.formGroup = this.createFormCourse(new CourseEntity());
    this.formFields = FORM_FIELD['COURSE'];
  }
  ngOnInit(): void {
  }

  createFormCourse(course: CourseEntity): FormGroup {
    return this.fb.group({
      description: new FormControl(course?.description ?? '', [Validators.required]),
      menu: new FormControl(course?.menu ?? '', [Validators.required])
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
