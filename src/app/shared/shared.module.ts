import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumnsComponent } from './breadcrumns/breadcrumns.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadcrumnsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    BreadcrumnsComponent,
    SidebarComponent,
    HeaderComponent    
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
