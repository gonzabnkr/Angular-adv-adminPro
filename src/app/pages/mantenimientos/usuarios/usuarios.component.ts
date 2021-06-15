import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = []
  public usuariosTemp : Usuario[] = []
  public desde = 0
  public cargando : boolean = true;
  public imgSubs :  Subscription;

  constructor(private _usuariosService : UsuarioService,
              private _busquedaService : BusquedaService,
              private _modalImagenService : ModalImagenService) { 

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios()
    this.imgSubs = this._modalImagenService.nuevaImagen
    .pipe(delay(200))
    .subscribe(img=>this.cargarUsuarios())
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
      this.totalUsuarios = total
      this.usuarios = usuarios
      this.usuariosTemp = usuarios
      this.cargando = false;
    })
  }
  cambiarPag(valor:number){
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0
    }else if(this.desde >= this.totalUsuarios  ){
      this.desde -= valor;
    }
    this.cargarUsuarios()
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp
    }
    this._busquedaService.buscar('usuarios',termino)
      .subscribe(resp => {
        this.usuarios = resp
      })
  }

  eliminarUsuario(usuario : Usuario){

    if(usuario.uid === this._usuariosService.uid){
      return Swal.fire('Error',`No puede borrarse a usted mismo`,'error')
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuariosService.eliminarUsuario(usuario)
          .subscribe(resp=>{
            Swal.fire('Usuario Borrado',`${usuario.nombre} Fue eliminado correctamente`,'success')
            this.cargarUsuarios()
          })
      }
    })

    
  }

  cambiarRole(usuario:Usuario){
    console.log(usuario)
    this._usuariosService.guardarUsuario(usuario)
      .subscribe(resp=>{
        console.log(resp)
      })
  }

  mostarModal(usuario:Usuario){
    console.log(usuario)
    this._modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img)
    
  }

}
