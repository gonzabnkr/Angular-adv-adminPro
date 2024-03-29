import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
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
  public usuario : Usuario


  constructor(private sidebarService:SidebarService,
              private _usuariosService: UsuarioService,
              private router: Router) { 
    this.menuItems = sidebarService.menu;
    this.usuario = _usuariosService.user
    
  }

  logout(){
    this._usuariosService.logout()
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
