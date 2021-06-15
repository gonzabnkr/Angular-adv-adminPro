import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any[]=[
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main',url:'/'},
        {titulo: 'Grafica1',url:'grafica1'},
        {titulo: 'ProgressBar',url:'progress'},
        {titulo: 'Promesas',url:'promesas'},
        {titulo: 'Rxjs',url:'rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios',url:'usuarios'},
        {titulo: 'Medicos',url:'medicos'},
        {titulo: 'Hospitales',url:'hospitales'},
        
      ]
    }
  ];

  constructor() { }
}
