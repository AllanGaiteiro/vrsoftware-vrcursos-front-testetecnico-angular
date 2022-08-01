import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  codigo: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 1, name: 'Hydrogen' },
  { codigo: 2, name: 'Helium' },
  { codigo: 3, name: 'Lithium' },
  { codigo: 4, name: 'Beryllium' },
  { codigo: 5, name: 'Boron' },
  { codigo: 6, name: 'Carbon' },
  { codigo: 7, name: 'Nitrogen' },
  { codigo: 8, name: 'Oxygen' },
  { codigo: 9, name: 'Fluorine' },
  { codigo: 10, name: 'Neon' },
];

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  displayedColumnsObj: { name: string, value: string }[] =
    [
      { name: 'codigo', value: "Codigo" },
      { name: 'name', value: "Nome" }
    ];
  displayedColumns: string[] = []
  dataSource = ELEMENT_DATA;
  constructor() {
    console.log('app-courses', this.displayedColumnsObj);
    console.log('app-courses', this.dataSource);
  }

  ngOnInit(): void {
  }

}
