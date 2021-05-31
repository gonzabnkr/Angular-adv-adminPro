import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() { 
    let i = -1;
    const obs$ = new Observable(observer=>{
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if (i===4){
          clearInterval(intervalo);
          observer.complete()
        }
      },1000)
    });

    obs$.subscribe(
      valor=>console.log('subs',valor)
    );
  }

 

}
