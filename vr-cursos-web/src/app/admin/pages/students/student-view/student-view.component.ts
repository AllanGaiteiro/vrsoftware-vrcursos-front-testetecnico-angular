import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { MatriculationService } from '../../matriculations/matriculation.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string, length: number }[] =
    [
      { name: 'id', value: "Codigo", length: 3 },
      { name: 'description', value: "Descrição", length: 7 },
      { name: 'actions', value: 'Ação', length: 2 }
    ];
  formFields: {
    name: string, value: string, type: string
  }[];
  studentId: number;
  formGroup: FormGroup;
  student!: StudentEntity;
  courses?: CourseEntity[]


  matriculationSubscription?: Subscription;
  studentSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private matriculationService: MatriculationService,
    private router: Router,
    private activedRouter: ActivatedRoute) {
    this.studentId = +this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
    this.formFields = [
      { name: 'name', value: 'Nome', type: 'input' }
    ];
  }

  ngOnInit(): void {
    // Find One - Student
    this.studentSubscription = this.service.findOne(this.studentId).subscribe((student) => {
      this.student = student;
      this.createFormStudent();
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })

    // Find - Matriculation of Student for Course
    this.matriculationSubscription = this.matriculationService.find({ where: { student: { id: this.studentId } } }).subscribe((matriculations) => {
      this.courses = matriculations.map(m => m.course);
    }, (error) => {
      console.error('Matriculation Find - Error ocurred', error)
    })
  }

  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe()
    }
    if (this.matriculationSubscription) {
      this.matriculationSubscription.unsubscribe()
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

  onRedirect(id: number) {
    this.router.navigate([`/courses/ver/${id}`])
  }
}
