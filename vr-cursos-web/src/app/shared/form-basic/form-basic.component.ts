import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormCoursesComponent implements OnInit {
  @Input() formFields: {
    name: string, value: string, type: string
  }[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() formName: string = '';
  @Input() actions: string[] = [];
  @Output() newEventSubmit = new EventEmitter<any>();

  onSubmit() {
    this.newEventSubmit.emit(this.formGroup.getRawValue());
  }
  ngOnInit(): void {
  }

}
