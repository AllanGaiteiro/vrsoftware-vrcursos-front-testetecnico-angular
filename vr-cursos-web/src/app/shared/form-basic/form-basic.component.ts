import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormCoursesComponent implements OnInit {
  @Input() formFields:{name:string,value:string}[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() formName: string = '';

  ngOnInit(): void {
  }

}
