import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems : any[];

  constructor(private sidebarService:SidebarService,
              private _usuariosService: UsuarioService,
              private router: Router) { 
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems)
  }

  logout(){
    this._usuariosService.logout()
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
