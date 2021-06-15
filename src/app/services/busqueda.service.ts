import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';


const baseUrl =  environment.base_url

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http : HttpClient) { }

  get token():string{
    return localStorage.getItem('token')||'';
  }
  
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  private transformarUsuarios(respuesta :any[]):Usuario[]{
    return respuesta.map(
      user=>new Usuario(user.nombre,user.email,'',user.role,user.google,user.img,user.uid)
    );
  }

  buscar(tipo : 'usuarios'|'medicos'|'hospitales', termino: string ){

    
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url,this.headers)
      .pipe(
        map((resp:any)=> {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados)
              break;
          
            default:
              return []
              break;
          }
        })
      )

  }

}
