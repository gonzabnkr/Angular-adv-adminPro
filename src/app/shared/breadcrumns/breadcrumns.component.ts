import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumns',
  templateUrl: './breadcrumns.component.html',
  styles: [
  ]
})
export class BreadcrumnsComponent implements OnDestroy{
  
  public titulo : string;
  public rutas$: Subscription;
  constructor(private router:Router) { 
   
    this.rutas$ = this.getArgumentosRuta()
                      .subscribe(({titulo})=>{
                        console.log(titulo)
                        this.titulo=titulo
                        document.title=`AdminPro - ${titulo}`
                      })
    
  }
  ngOnDestroy(): void {
    this.rutas$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
          .pipe(
            filter(event=>event instanceof ActivationEnd),
            filter((event:ActivationEnd)=>event.snapshot.firstChild === null),
            map((event:ActivationEnd)=>event.snapshot.data)
          )
          
  }
  

}
