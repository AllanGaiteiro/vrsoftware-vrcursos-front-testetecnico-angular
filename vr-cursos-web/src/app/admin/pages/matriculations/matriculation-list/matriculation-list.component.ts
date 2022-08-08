import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';
import { DISPLAYED_COLUMNS } from 'src/app/core/utils/displayed-columns';
import { DisplayedColumns } from "src/app/core/models/common/DisplayedColumns";
import { MatriculationService } from '../matriculation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: MatriculationService, private router: Router) {
    this.displayedColumns = this.getDisplayedColumns();
    this.getMatriculations();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async getMatriculations(): Promise<void> {
    try {
      const matriculations = await this.service.find();
      if (matriculations.length > 0) {
        this.matriculations = matriculations;
        this.dataSource = new MatTableDataSource(matriculations);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'course': return item.course.description;
              case 'student': return item.student.name;
              case 'id': return item.id;
              default: return item.id;
            }
          };
          this.dataSource.sort = this.sort;
        }
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
