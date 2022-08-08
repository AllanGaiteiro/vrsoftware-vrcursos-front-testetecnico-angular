import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { FormField } from "src/app/core/models/common/FormField";
import { CourseService } from '../course.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComfirmComponent } from 'src/app/shared/dialog-comfirm/dialog-comfirm.component';
import { Router } from '@angular/router';

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
    private service: CourseService,
    public dialog: MatDialog,
    private router: Router
  ) {
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

  async createCourse(newCourse: CourseEntity): Promise<void> {
    this.dialog.open(DialogComfirmComponent, {
      width: '600px',
      panelClass: 'mat-dialog-class',
      data: {
        title: 'Criar Novo Curso',
        description: 'Voce realmente deseja continuar?',
        isOnlyConfirm: true
      }
    }).afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          const course = await this.service.create(newCourse);
          this.onRedirect(course.id)
        } catch (error) {
          console.error('Course Create - Error ocurred', error);
        }
      }

    });
  }

  onRedirect(id: number) {
    this.router.navigate([`/cursos/ver/${id}`]);
  }
}
