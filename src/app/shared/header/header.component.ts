import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario : Usuario

  constructor(private _usuariosService: UsuarioService,
              private router: Router) { 
    
    this.usuario = _usuariosService.user
    
  }

  ngOnInit(): void {
  }

  logout(){
    this._usuariosService.logout()
    this.router.navigateByUrl('/login')
  }

}
