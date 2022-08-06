import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements OnInit {
  @Input() displayedColumnsObj: { name: string, value: string, length: number }[] = [];
  @Input() data: any[] = [];
  @Input() actions: string[] = [];
  displayedColumns: string[] = []
  constructor() {
  }

  ngOnInit(): void {

    // add column action
    if (this.actions.length > 0) {
      this.displayedColumnsObj.push({ name: 'actions', value: 'Ações', length: 2 });
    }
    this.displayedColumns = this.getDisplayedColumns();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumnsObj.length > 0 ? this.displayedColumnsObj.map(({ name }) => name) : [];
  }

  btnAction(action: string) {
    console.log(action)
  }
}
