import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedColumns } from 'src/app/core/models/common/DisplayedColumns';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit {
  @Input() displayedColumnsObj: DisplayedColumns[] = [];
  @Input() data: any[] = [];
  @Input() actions: string[] = [];
  @Output() newEventDelete = new EventEmitter<number>();
  @Output() newEventRedirect = new EventEmitter<number>();
  @Output() newEventAdd = new EventEmitter<number>();
  displayedColumns: string[] = []
  dataSource?: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;
  @ViewChild(MatSort)
  sort?: MatSort;
  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    this.dataSource = new MatTableDataSource(this.data);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      /*
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'course': return item.course.description;
          case 'student': return item.student.name;
          case 'id': return item.id;
          default: return item[property];
        }
      };*/
      this.dataSource.sort = this.sort;
    }
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }


  onAdd(id: number) {
    this.newEventAdd.emit(id);
  }
  onRedirect(id: number) {
    this.newEventRedirect.emit(id);
  }
  onDelete(id: number) {
    this.newEventDelete.emit(id);
  }
}

