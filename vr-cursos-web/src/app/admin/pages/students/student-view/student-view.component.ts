import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormField } from "src/app/core/models/common/FormField";
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { CreateMatriculationDto } from 'src/app/core/models/matriculation/dto/create-matriculation.dto';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { CourseService } from '../../courses/course.service';
import { MatriculationService } from '../../matriculations/matriculation.service';
import { StudentService } from '../student.service';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss',
    '../../../../../styles/div-title.scss']
})
export class StudentViewComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] = DISPLAYED_COLUMNS['COURSE'];
  formFields: FormField[];
  studentId: number;
  formGroup: FormGroup;
  student!: StudentEntity;
  coursesMatriculed?: CourseEntity[] = [];
  courses: CourseEntity[] = [];
  //coursesSelected: any;
  matriculationSubscription?: Subscription;
  courseSubscription?: Subscription;
  studentSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private matriculationService: MatriculationService,
    private courseService: CourseService,
    private router: Router,
    private activedRouter: ActivatedRoute) {
    this.studentId = +this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
    this.formFields = FORM_FIELD['STUDENT'];
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
      if (matriculations.length > 0) {
        this.coursesMatriculed = matriculations?.map(m => m.course);
      }

    }, (error) => {
      console.error('Matriculation Find - Error ocurred', error)
    })

    // Find - Matriculation of Student for Course
    this.courseSubscription = this.courseService.find().subscribe((courses) => {
      if (courses.length > 0) {
        const coursesMatriculedIds = this.coursesMatriculed?.map((c) => c.id) || [];
        this.courses = courses?.filter(c => !coursesMatriculedIds?.includes(c.id));
      }

    }, (error) => {
      console.error('Course Find - Error ocurred', error)
    });
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

  async onNewMatriculation(options: MatListOption[]): Promise<void> {
    const newMatriculations = options.map(({ value: courseId }) => ({
      courseId,
      studentId: this.studentId,
    }) as CreateMatriculationDto)
    try {
      console.log(newMatriculations);
      await Promise.all(newMatriculations.map(async (matriculation) => await this.matriculationService.create(matriculation)))
      console.log('Matriculation Create - Success');
    } catch (error) {
      console.error('Matriculation Create - Error ocurred', error);
    }

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
    this.router.navigate([`/cursos/ver/${id}`])
  }
}
