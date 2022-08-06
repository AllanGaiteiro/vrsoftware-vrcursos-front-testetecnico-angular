import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string, length: number }[] =
    [
      { name: 'id', value: "Codigo", length: 3 },
      { name: 'name', value: "Nome", length: 7 },
      { name: 'actions', value: 'Ação', length: 2 }
    ];
  studentsubscription?: Subscription;
  displayedColumns: string[] = [];
  students: StudentEntity[] = [];
  constructor(private service: StudentService, private router: Router) {
  }

  ngOnInit(): void {
    // Student Find
    this.studentsubscription = this.service.find().subscribe((students) => {
      this.students = students;
    }, (error) => {
      console.error('Student Find One - Error ocurred', error)
    })
    this.displayedColumns = this.getDisplayedColumns();
  }

  ngOnDestroy(): void {
    if (this.studentsubscription) {
      this.studentsubscription.unsubscribe()
    }
  }

  deleteStudent(codigo: number) {
    this.service.delete(codigo)
  }

  redirectByRouter(id: number) {
    console.log(`/alunos/ver/${id}`)
    this.router.navigate([`/alunos/ver/${id}`])
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }
}
