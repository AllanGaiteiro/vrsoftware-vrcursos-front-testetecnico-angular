import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  setings = {
    name:'Salvar',
    color:'acent-collor',
    action:'Salvar',
  };
  constructor() { }

  ngOnInit(): void {
  }

}
