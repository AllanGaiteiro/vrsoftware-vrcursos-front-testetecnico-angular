import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comfirm',
  templateUrl: './dialog-comfirm.component.html',
  styleUrls: ['./dialog-comfirm.component.scss']
})
export class DialogComfirmComponent implements OnInit {
  public title = 'Dialog Comfirm';
  public description = 'Dialog Comfirm 2';
  public isOnlyConfirm: boolean = false;


  constructor(public dialogRef: MatDialogRef<DialogComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.description = data.description;
    this.isOnlyConfirm = data.isOnlyConfirm;
  }

  ngOnInit(): void {
  }


}

