import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayedColumns } from 'src/app/core/models/common/DisplayedColumns';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit {
  @Input() displayedColumnsObj: DisplayedColumns[] = [];
  @Input() data: any[] = [];
  @Input() actions?: string[] = [];
  @Output() newEventDelete = new EventEmitter<number>();
  @Output() newEventRedirect = new EventEmitter<number>();
  @Output() newEventAdd = new EventEmitter<number>();
  displayedColumns: string[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }


  onAdd(id:number) {
    this.newEventAdd.emit(id);
  }  
  onRedirect(id:number) {
    this.newEventRedirect.emit(id);
  }  
  onDelete(id: number) {
    this.newEventDelete.emit(id);
  }  
}

