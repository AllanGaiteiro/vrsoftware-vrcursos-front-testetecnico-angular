import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Menu } from './core/menu-admin/Menu';
import { SharedModule } from './shared/shared.module';
import { SidenavCardComponent } from './sidenav-card/sidenav-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  exports:[SharedModule],
  providers: [Menu],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
