import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  public perfilForm : FormGroup;
  public usuario : Usuario;
  public imagenSubir : File;
  public imgTemp : any = null;

  constructor(private fb:FormBuilder,
              private _usuarioService : UsuarioService,
              private _fileUploadService : FileUploadService) { 
  
    this.usuario = _usuarioService.user
              
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]]
    });
  }

  actualizarPerfil(){
    this._usuarioService.ActualizarUsuario(this.perfilForm.value)
      .subscribe(resp=>{
        const {nombre , email} = this.perfilForm.value
        this.usuario.nombre = nombre
        this.usuario.email = email
        Swal.fire('Guardado','Fueron guardados los cambios','success')
      },(error)=>{
        Swal.fire('Error',error.error.msg,'error')
        
      })
  }

  cambiarImagen(file:File){
    this.imagenSubir = file;
    if (!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    
    this._fileUploadService
      .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado','Fueron guardados los cambios','success')
      }).catch(error =>{
        Swal.fire('Error','No se pudo guardar la imagen','error')
        console.log(error)
      })
      
    
  }

}
