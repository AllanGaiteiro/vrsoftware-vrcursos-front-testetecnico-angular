import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormField } from "src/app/core/models/common/FormField";
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { MatriculationService } from '../../matriculations/matriculation.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss',
    '../../../../../styles/div-title.scss']
})
export class CourseViewComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] =
    DISPLAYED_COLUMNS['COURSE'];
  formFields: FormField[] = FORM_FIELD['COURSE'];
  courseId: number;
  formGroup: FormGroup;
  course?: CourseEntity;
  students?: StudentEntity[];

  courseSubscription?: Subscription;
  matriculationSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private service: CourseService,
    private matriculationService: MatriculationService,
    private router: Router,
    private activedRouter: ActivatedRoute) {
    this.courseId = +this.activedRouter.snapshot.params['id'];
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    // Find One - Course
    this.courseSubscription = this.service.findOne(this.courseId).subscribe((course) => {
      this.course = course;
      this.createFormCourse();
    }, (error) => {
      console.error('Course Find One - Error ocurred', error)
    })

    // Find - Matriculation of Student for Course
    this.matriculationSubscription = this.matriculationService.find({ where: { course: { id: this.courseId } } }).subscribe((matriculations) => {
      this.students = matriculations.map(m => m.student);
    }, (error) => {
      console.error('Matriculation Find - Error ocurred', error)
    })
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
    if (this.matriculationSubscription) {
      this.matriculationSubscription.unsubscribe()
    }
  }

  createFormCourse(): void {
    this.formGroup = this.fb.group({
      description: new FormControl(this.course?.description ?? '', [Validators.required]),
      menu: new FormControl(this.course?.menu ?? '', [Validators.required])
    })
  }

  async updateCourse(course: Partial<CourseEntity>): Promise<void> {
    try {
      console.log('Course Update - Success');
      await this.service.update(this.courseId, course);
    } catch (error) {
      console.error('Course Update - Error ocurred', error);
    }
  }

  onRedirect(id: number) {
    this.router.navigate([`/alunos/ver/${id}`])
  }

}
