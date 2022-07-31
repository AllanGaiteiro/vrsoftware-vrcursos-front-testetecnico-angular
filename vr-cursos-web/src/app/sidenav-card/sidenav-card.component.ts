import { Component, OnInit } from '@angular/core';
import { Menu } from '../core/menu-admin/Menu';

@Component({
  selector: 'app-sidenav-card',
  templateUrl: './sidenav-card.component.html',
  styleUrls: ['./sidenav-card.component.scss']
})
export class SidenavCardComponent implements OnInit {

  constructor(public menu: Menu) { }

  ngOnInit(): void {
  }

}
