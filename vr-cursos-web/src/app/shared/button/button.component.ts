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
    this.settings = {
      name: this.getName(),
      color: this.getCollor(),
      action: this.action
    }
  }

  getName(): string {
    if (this.action === 'delete') {
      return 'Deletar';
    }
    if (this.action === 'view') {
      return `Visualizar ${this.name}`;
    }
    if (this.action === 'list') {
      return `Lista de ${this.name}`;
    }
    if (this.action === 'save') {
      return 'Salvar';
    }
    if (this.action === 'back') {
      return 'Voltar';
    }
    return 'Botão'
  }

  getCollor(): string {
    if (this.action === 'delete') {
      return 'warn-collor';
    } else {
      return 'acent-collor'
    }
  }

}
