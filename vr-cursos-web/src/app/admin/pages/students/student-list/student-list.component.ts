import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss',
    '../../../../../styles/div-title.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] = DISPLAYED_COLUMNS['STUDENT'];
  studentsubscription?: Subscription;
  students?: StudentEntity[];
  constructor(private service: StudentService, private router: Router) {
  }

  ngOnInit(): void {
    this.getStudent();
  }

  // Get Data
  async getStudent(): Promise<void> {
    try {
      const students = await this.service.find();
      if (students.length > 0) {
        this.students = students
      }
    } catch (error) {
      console.error('Student Find One - Error ocurred', error)
    }
  }

  onDelete(codigo: number) {
    this.service.delete(codigo)
  }

  onRedirect(id: number) {
    this.router.navigate([`/alunos/ver/${id}`])
  }
}
