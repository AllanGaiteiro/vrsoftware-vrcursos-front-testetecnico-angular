import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() action: string = '';
  @Input() name: string = '';
  @Input() disable: boolean = false;
  icon?: 'save' | 'delete_outline' | 'search';
  settings: {
    name: string;
    color: string;
    action: string;
  };
  constructor() {
      this.settings = {
        name: this.getName(),
        color: this.getCollor(),
        action: this.action
      }
  }

  ngOnInit(): void {
    this.changeIcon();
    this.settings = {
      name: this.getName(),
      color: this.getCollor(),
      action: this.action
    }
  }

  getName(): string {
    /*if (this.action === 'delete') {
      return null;
    }
    if (this.action === 'view') {
      return `Visualizar ${this.name}`;
    }*/
    if (this.action === 'list') {
      return `Lista de ${this.name}`;
    }
    if (this.action === 'save') {
      return 'Salvar';
    }
    if (this.action === 'back') {
      return 'Voltar';
    }
    return ''
  }

  getCollor(): string {
    if (this.action === 'delete') {
      return 'warn-collor';
    } else {
      return 'acent-collor'
    }
  }

  changeIcon():void{
    if(this.action === 'view'){
      this.icon = 'search';
    }else if(this.action === 'save'){
      this.icon = 'save';
    }else if(this.action === 'delete'){
      this.icon = 'delete_outline';
    }
  }

}
