import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { FormField } from "src/app/core/models/common/FormField";
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss',
    '../../../../../styles/div-title.scss']
})
export class StudentCreateComponent implements OnInit {
  formFields: FormField[];
  formGroup: FormGroup;
  student?: StudentEntity;
  constructor(
    private fb: FormBuilder,
    private service: StudentService) {
    this.formGroup = this.createFormStudent(new StudentEntity());
    this.formFields = FORM_FIELD['STUDENT'];
  }
  ngOnInit(): void {
  }

  createFormStudent(student: StudentEntity): FormGroup {
    return this.fb.group({
      name: new FormControl(student?.name ?? '', [Validators.required])
    })
  }

  async createStudent(student: StudentEntity): Promise<void> {
    try {
      console.log('Student Create - Success');
      await this.service.create(student);
    } catch (error) {
      console.error('Student Create - Error ocurred', error);
    }
  }
}
