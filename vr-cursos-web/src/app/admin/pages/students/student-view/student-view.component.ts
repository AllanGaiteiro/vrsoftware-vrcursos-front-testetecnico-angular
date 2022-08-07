import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  runCreateMatriculation: boolean = false;
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
    this.getStudent()
    this.getMatriculations();
    this.getCourses()
  }

  // Get Data
  async getStudent(): Promise<void> {
    try {
      const student = await this.service.findOne(this.studentId);
      if (student) {
        this.student = student
        this.createFormStudent();
      }
    } catch (error) {
      console.error('Student Find - Error ocurred - ', error)
    }
  }

  async getMatriculations(): Promise<void> {
    try {
      const matriculations = await this.matriculationService.find({ where: { student: { id: this.studentId } } });
      if (matriculations.length > 0) {
        this.coursesMatriculed = matriculations?.map(m => m.course);

        if (this.courses.length > 0) {
          this.getCoursesNotMatriculed();
        }
      }
    } catch (error) {
      console.error('Matriculation Find - Error ocurred - ', error)
    }
  }

  async getCourses(): Promise<void> {
    try {
      const courses = await this.courseService.find();
      if (courses.length > 0) {
        this.courses = courses
        if (this.coursesMatriculed) {
          this.getCoursesNotMatriculed();
        }
      }
    } catch (error) {
      console.error('Course Find - Error ocurred - ', error)
    }
  }

  // Create 
  async onNewMatriculation(options: MatListOption[]): Promise<void> {
    this.runCreateMatriculation = true;
    const newMatriculations = options.map(({ value: courseId }) => ({
      courseId,
      studentId: this.studentId,
    }) as CreateMatriculationDto)
    try {
      await Promise.all(newMatriculations.map(async (matriculation) => await this.matriculationService.create(matriculation)))
      this.runCreateMatriculation = false;
    } catch (error) {
      console.error('Matriculation Create - Error ocurred', error);
    }

  }

  // Update
  async updateStudent(student: StudentEntity): Promise<void> {
    try {
      await this.service.update(this.studentId, student);
    } catch (error) {
      console.error('Student Update - Error ocurred', error);
    }
  }

  // Form
  createFormStudent(): void {
    this.formGroup = this.fb.group({
      name: new FormControl(this.student?.name ?? '', [Validators.required])
    })
  }

  getCoursesNotMatriculed(): void {
    const coursesMatriculedIds = this.coursesMatriculed?.map((c) => c.id) || [];
    this.courses = this.courses?.filter(c => !coursesMatriculedIds?.includes(c.id));
  }
  onRedirect(id: number) {
    this.router.navigate([`/cursos/ver/${id}`])
  }
}
