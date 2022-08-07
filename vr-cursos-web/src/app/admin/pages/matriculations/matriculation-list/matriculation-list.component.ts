import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { MatriculationService } from '../matriculation.service';

@Component({
  selector: 'app-matriculation-list',
  templateUrl: './matriculation-list.component.html',
  styleUrls: ['./matriculation-list.component.scss',
    '../../../../../styles/div-title.scss']
})
export class MatriculationListComponent implements OnInit {
  displayedColumnsObj: DisplayedColumns[] = DISPLAYED_COLUMNS['MATRICULATION'];
  courseSubscription?: Subscription;
  displayedColumns: string[] = [];
  matriculations: Matriculation[] = [];
  constructor(private service: MatriculationService, private router: Router) {
    this.displayedColumns = this.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.getMatriculations();
  }

  async getMatriculations(): Promise<void> {
    try {
      const matriculations = await this.service.find();
      if (matriculations.length > 0) {
        this.matriculations = matriculations;
      }
    } catch (error) {
      console.error('Matriculation Find - Error ocurred - ', error)
    }
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
