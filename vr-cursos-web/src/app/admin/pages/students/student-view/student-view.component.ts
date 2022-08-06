import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  formFields: {
    name: string, value: string, type: string
  }[];
  formGroup: FormGroup;
  student!: StudentEntity;
  studentId: number;
  studentSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: StudentService, private activedRouter: ActivatedRoute) {
    this.studentId = this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
    this.formFields = [
      { name: 'name', value: 'Nome', type: 'input' }
    ];
  }

  ngOnInit(): void {
    // Student Find One
    this.studentSubscription = this.service.findOne(this.studentId).subscribe((student) => {
      this.student = student;
      this.createFormStudent();
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })
  }

  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe()
    }
  }

  createFormStudent(): void {
    this.formGroup = this.fb.group({
      name: new FormControl(this.student?.name ?? '', [Validators.required])
    })
  }

  async updateStudent(student: StudentEntity): Promise<void> {
    try {
      console.log('Student Update - Success');
      await this.service.update(this.studentId, student);
    } catch (error) {
      console.error('Student Update - Error ocurred', error);
    }
  }

}
