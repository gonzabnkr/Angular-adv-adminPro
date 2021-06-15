import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators'

import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuario.interface';

const baseUrl = environment.base_url;
declare const gapi :any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2 : any
  public user : Usuario;

  constructor(private http:HttpClient,
              private ngZone:NgZone) {
    this.googleInit();
    
   }

  get token():string{
    return localStorage.getItem('token')||'';
  }
  get uid():string{
    return this.user.uid || '';
  }
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  googleInit(){
   
    return new Promise<void>(resolve =>{
      gapi.load('auth2', ()=> {
        this.auth2 = gapi.auth2.init({
          client_id: '1050909540329-cq4iitfbm7291ed3vh6rslcgcrgt9uh5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  logout(){
    localStorage.removeItem('token')
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        
      })
    });
  }

  validarToken():Observable<boolean>{
    
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any) =>{
        const {email,nombre,role,google,img='',uid} = resp.usuario;
        this.user = new Usuario(nombre,email,'',role,google,img,uid);
        this.user.imagenUrl
        localStorage.setItem('token',resp.token)
        return true
      }),
      catchError(error=>{
        console.error(error)
        return of(false);
      })
    )
  }

  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${baseUrl}/usuarios`, formData)
    
  }

  ActualizarUsuario(data: {email:string, nombre:string}){
    console.log(this.user)
   return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data,this.headers)
  }

  loginUsuario(formData:LoginForm){

    if (formData.recordar.valueOf()){
      localStorage.setItem('email',formData.email.valueOf())
    }else{
      localStorage.removeItem('email')
    }
    
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap((resp:any)=>{
          localStorage.setItem('token',resp.token)
        })
      )
  }

  loginGoogle( token ) {
       
    return this.http.post(`${baseUrl}/login/google`, {token})
      .pipe(
        tap((resp:any)=>{
          localStorage.setItem('token',resp.token)
        })
      )
  }

  cargarUsuarios(desde: number = 0){
    const url = `${baseUrl}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuarios>(url,this.headers)
      .pipe(
        map(resp=>{
          const usuarios = resp.usuarios.map(user=>new Usuario(user.nombre,user.email,'',user.role,user.google,user.img,user.uid))
          return {
            total: resp.total,
            usuarios
          }
        })
      )
  }
  
  eliminarUsuario(usuario : Usuario){

    //http://localhost:3000/api/usuarios/604bbf1e8b17063b8c583bb6

    const url = `${baseUrl}/usuarios/${usuario.uid}`
    return this.http.delete(url,this.headers)
  }

  guardarUsuario(usuario: Usuario){

    return this.http.put(`${baseUrl}/usuarios/${usuario.uid}`, usuario,this.headers)

  }



}
