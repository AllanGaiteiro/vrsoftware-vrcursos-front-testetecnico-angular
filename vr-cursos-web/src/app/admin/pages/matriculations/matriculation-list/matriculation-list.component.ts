import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';
import { MatriculationService } from '../matriculation.service';

@Component({
  selector: 'app-matriculation-list',
  templateUrl: './matriculation-list.component.html',
  styleUrls: ['./matriculation-list.component.scss']
})
export class MatriculationListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string, length: number }[] =
    [
      { name: 'id', value: "Codigo", length: 3 },
      { name: 'course', value: "Cursos", length: 4 },
      { name: 'student', value: 'Aluno', length: 5 }
    ];
  courseSubscription?: Subscription;
  displayedColumns: string[] = [];
  matriculations: Matriculation[] = [];
  constructor(private service: MatriculationService, private router: Router) {
  }

  ngOnInit(): void {
    // Course Find
    this.courseSubscription = this.service.find().subscribe((matriculations) => {
      console.log(matriculations, matriculations.map(m => m['course']));
      this.matriculations = matriculations;
    }, (error) => {
      console.error('Matriculation Find One - Error ocurred', error)
    })
    this.displayedColumns = this.getDisplayedColumns();
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe()
    }
  }

  deleteMatriculation(id: number) {
    this.service.delete(id)
  }

  redirectByRouter(id: number) {
    this.router.navigate([`/matriculations/ver/${id}`])
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }
}
