import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {
  
  public imagenSubir : File;
  public imgTemp : any = null;
  

  constructor(public _modalImagenService :ModalImagenService,
              private _fileUploadService : FileUploadService,
              ) { 
    
  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this._modalImagenService.cerrarModal()
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
    
    const id = this._modalImagenService.id
    const tipo = this._modalImagenService.tipo
    this._fileUploadService
      .actualizarFoto(this.imagenSubir,tipo , id)
      .then(img => {
        this._modalImagenService.img = img;
        Swal.fire('Guardado','Fueron guardados los cambios','success')
        this._modalImagenService.nuevaImagen.emit(img)
        this.cerrarModal()
      }).catch(error =>{
        Swal.fire('Error','No se pudo guardar la imagen','error')
        console.log(error)
      })
      
    
  }

  

}
