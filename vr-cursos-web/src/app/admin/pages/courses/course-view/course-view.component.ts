import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormField } from "src/app/core/models/common/FormField";
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { MatriculationService } from '../../matriculations/matriculation.service';
import { CourseService } from '../course.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComfirmComponent } from 'src/app/shared/dialog-comfirm/dialog-comfirm.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss',
    '../../../../../styles/div-title.scss']
})
export class CourseViewComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] =
    DISPLAYED_COLUMNS['STUDENT'];
  formFields: FormField[] = FORM_FIELD['COURSE'];
  courseId: number;
  formGroup: FormGroup;
  course?: CourseEntity;
  students?: StudentEntity[];
  constructor(
    private fb: FormBuilder,
    private service: CourseService,
    private matriculationService: MatriculationService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.courseId = +this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    // Find One - Course
    this.getCourse();

    // Find - Matriculation of Student for Course
    this.getMatriculations();
  }

  // Get Data
  async getCourse(): Promise<void> {
    try {
      const course = await this.service.findOne(this.courseId);
      if (course) {
        this.course = course
        this.createFormCourse();
      }
    } catch (error) {
      console.error('Course Find - Error ocurred - ', error)
    }
  }

  async getMatriculations(): Promise<void> {
    try {
      const matriculations = await this.matriculationService.find({ where: { course: { id: this.courseId } } });
      if (matriculations.length > 0) {
        this.students = matriculations?.map(m => m.student);
      }
    } catch (error) {
      console.error('Matriculation Find - Error ocurred - ', error)
    }
  }

  createFormCourse(): void {
    this.formGroup = this.fb.group({
      description: new FormControl(this.course?.description ?? '', [Validators.required]),
      menu: new FormControl(this.course?.menu ?? '', [Validators.required])
    })
  }

  async updateCourse(course: Partial<CourseEntity>): Promise<void> {
    this.dialog.open(DialogComfirmComponent, {
      width: '600px',
      panelClass: 'mat-dialog-class',
      data: {
        title: 'Atualizar Curso',
        description: 'Voce realmente deseja continuar?',
        isOnlyConfirm: true
      }
    }).afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          await this.service.update(this.courseId, course);
        } catch (error) {
          console.error('Course Update - Error ocurred', error);
        }
      }

    })
  }

  onRedirect(id: number) {
    this.router.navigate([`/alunos/ver/${id}`])
  }

}
