import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() actionName: string = '';
  @Input() name: string = '';
  @Input() disable: boolean = false;
  @Input() spinner: boolean = false;
  icon?: 'save' | 'delete_outline' | 'search' | 'add_circle_outline';
  settings: {
    name: string;
    color: string;
    action: string;
  };
  constructor() {
    this.settings = {
      name: this.getName(),
      color: this.getCollor(),
      action: this.actionName
    }
  }

  ngOnInit(): void {
    this.changeIcon();
    this.settings = {
      name: this.getName(),
      color: this.getCollor(),
      action: this.actionName
    }
  }

  getName(): string {
    if (this.actionName === 'list') {
      return `Lista de ${this.name}`;
    }
    if (this.actionName === 'save') {
      return 'Salvar';
    }
    if (this.actionName === 'back') {
      return 'Voltar';
    }
    return this.name
  }

  getCollor(): string {
    if (this.actionName === 'delete') {
      return 'warn-collor';
    } else {
      return 'acent-collor'
    }
  }

  changeIcon(): void {
    if (this.actionName === 'view') {
      this.icon = 'search';
    } else if (this.actionName === 'save') {
      this.icon = 'save';
    } else if (this.actionName === 'delete') {
      this.icon = 'delete_outline';
    } else if (this.actionName === 'add') {
      this.icon = 'add_circle_outline';
    }
  }

}
