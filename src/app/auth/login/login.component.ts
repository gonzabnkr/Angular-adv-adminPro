import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit{
  public auth2: any;
  public loginForm = this.fb.group({
    
    email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    recordar: [false]
    
  });

  ngOnInit(){
    this.renderButton()
  }
  
  constructor(private router:Router,
              private fb:FormBuilder,
              private _usuarioService:UsuarioService,
              private ngZone:NgZone) { }


  

  login(){
    
    
    this._usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(()=>{
        
        this.router.navigateByUrl('/')
     
      },(err)=>{
        Swal.fire('Error',err.error.msg, 'error')
      })

      
 
  }

  
  

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
   
    });
    this.startApp();
  }

  async startApp (){
      await this._usuarioService.googleInit()
      this.auth2 = this._usuarioService.auth2
      this.attachSignin(document.getElementById('my-signin2'));
   
  };

  attachSignin (element){
    
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          var id_token = googleUser.getAuthResponse().id_token;
          
          this._usuarioService.loginGoogle(id_token).subscribe(resp=>{
            this.ngZone.run(()=>{
              this.router.navigateByUrl('/')
            })
          });
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });

  }
}