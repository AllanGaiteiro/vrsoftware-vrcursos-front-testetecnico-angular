import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {
  formFields: {
    name: string, value: string, type: string
  }[];
  formGroup: FormGroup;
  student?: StudentEntity;
  constructor(
    private fb: FormBuilder,
    private service: StudentService) {
    this.formGroup = this.createFormStudent(new StudentEntity());
    this.formFields = [
      { name: 'name', value: 'Nome', type: 'input' }
    ];
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
