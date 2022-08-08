import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayedColumns } from 'src/app/core/models/common/DisplayedColumns';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit, AfterViewInit {
  @Input() displayedColumnsObj: DisplayedColumns[] = [];
  @Input() data: any[] = [];
  @Input() actions: string[] = [];
  @Output() newEventDelete = new EventEmitter<number>();
  @Output() newEventRedirect = new EventEmitter<number>();
  @Output() newEventAdd = new EventEmitter<number>();
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    if (this.data.length > 0) {
      this.dataSource = new MatTableDataSource(this.data);
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

