import { Router } from "@angular/router"

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistroComponent } from "./registro/registro.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
    
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
