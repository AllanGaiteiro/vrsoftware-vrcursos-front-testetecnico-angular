import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/core/models/common/FormField';

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormCoursesComponent implements OnInit {
  @Input() formFields: FormField[] = [];
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
