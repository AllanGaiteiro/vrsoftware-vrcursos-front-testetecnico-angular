import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit {
  @Input() displayedColumnsObj: { name: string, value: string, length: number }[] = [];
  @Input() data: any[] = [];
  @Output() newEventDelete = new EventEmitter<number>();
  @Output() newEventRedirect = new EventEmitter<number>();
  displayedColumns: string[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }

  onDelete(id: number) {
    this.newEventDelete.emit(id);
  }  
  onRedirect(id:number) {
    this.newEventRedirect.emit(id);
  }
}

