import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
  ],
  exports: [
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
