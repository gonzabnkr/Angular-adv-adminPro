import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: [
    './registro.components.css'
  ]
})
export class RegistroComponent  {
  
  public fomrSubmintted = false;
 
  public registerForm = this.fb.group({
    nombre: ['Test1', [Validators.required, Validators.minLength(3)]],
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['1234567890', [Validators.required]],
    password2: ['1234567890', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, {validators: this.paswordsIguales('password','password2')});

  constructor(private fb:FormBuilder,
              private _usuarioService:UsuarioService,
              private router:Router) { 

  
  }

  crearUsuario(){
    this.fomrSubmintted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return
    }
    //Realizar posteo (Creacion de usuario) si el FORM es Valid

    this._usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp=>{
        this.router.navigateByUrl('/')
      },(err)=>{
        Swal.fire('Error',err.error.msg, 'error')
      })
  }

  campoNoValido (campo:string): boolean{
    
    if(this.registerForm.get(campo).invalid && this.fomrSubmintted){
      return true;
    }else{
      return false;
    }

  }
  aceptaTerminos(){
    if(!this.registerForm.get('terminos').value && this.fomrSubmintted){
      
      return true;
    }else{
      
      return false;
    }
  }

  paswordInvalid(){
    if((this.registerForm.get('password').value !== this.registerForm.get('password2').value) && this.fomrSubmintted){
      return true;
    }else{
      return false;
    }
  }
  paswordsIguales(pas1:string,pas2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pas1)
      const pass2Control = formGroup.get(pas2)
      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual:true})
      }
    }
  }  

}
