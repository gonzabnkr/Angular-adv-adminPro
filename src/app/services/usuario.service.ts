import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators'

import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
const baseUrl = environment.base_url;
declare const gapi :any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any

  constructor(private http:HttpClient,
              private ngZone:NgZone) {
    this.googleInit();
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
        console.log('User signed out.');
      })
    });
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token')||'';
    return this.http.get(`${baseUrl}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp=>true),
      catchError(error=>of(false))
    )
  }

  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${baseUrl}/usuarios`, formData)
    
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







}
