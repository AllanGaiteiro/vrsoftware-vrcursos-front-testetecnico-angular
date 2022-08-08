import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { FORM_FIELD } from 'src/app/core/utils/form-fields';
import { FormField } from "src/app/core/models/common/FormField";
import { StudentService } from '../student.service';
import { DialogComfirmComponent } from 'src/app/shared/dialog-comfirm/dialog-comfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
    private service: StudentService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.formGroup = this.createFormStudent(new StudentEntity());
    this.formFields = FORM_FIELD['STUDENT'];
  }
  ngOnInit(): void {
  }

  // Update
  async createStudent(newStudent: StudentEntity): Promise<void> {
    this.dialog.open(DialogComfirmComponent, {
      width: '600px',
      panelClass: 'mat-dialog-class',
      data: {
        title: 'Criar Novo Aluno',
        description: 'Voce realmente deseja continuar?',
        isOnlyConfirm: true
      }
    }).afterClosed().subscribe(async (res) => {
      if (res) {
        try {
          const student = await this.service.create(newStudent);
          this.onRedirect(student.id);
        } catch (error) {
          console.error('Student Create - Error ocurred', error);
        }
      }

    })
  }

  // Forms
  createFormStudent(student: StudentEntity): FormGroup {
    return this.fb.group({
      name: new FormControl(student?.name ?? '', [Validators.required])
    })
  }
  onRedirect(id: number) {
    this.router.navigate([`/alunos/ver/${id}`]);
  }
}
