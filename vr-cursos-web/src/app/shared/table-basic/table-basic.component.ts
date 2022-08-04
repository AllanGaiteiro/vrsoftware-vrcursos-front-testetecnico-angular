import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit {
  @Input() displayedColumnsObj: { name: string, value: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: string[] = [];
  displayedColumns: string[] = []
  classColumn: string = 'col-4';
  constructor() {
  }

  ngOnInit(): void {

    // add column action
    if (this.actions.length > 0) {
      this.displayedColumnsObj.push({ name: 'actions', value: 'Ações' });
    }
    this.displayedColumns = this.getDisplayedColumns();
    this.classColumn = this.getClassColumn();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }

  getClassColumn(): string {
    return 'col-' + (12 / this.displayedColumnsObj.length)
  }
}
