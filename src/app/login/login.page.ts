import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasenia: string = '';
  intentadoIniciarSesion: boolean = false;
  usernamePattern: RegExp = /^[a-zA-Z0-9]*$/;
  numberPattern: RegExp = /^[0-9]*$/;
  constructor(private router: Router) {}

  async checkLogin() {
    this.intentadoIniciarSesion = true;
    
    
    const usuarioGuardado = (await Preferences.get({ key: 'usuario' })).value;
    const contrasenaGuardada = (await Preferences.get({ key: 'contrasena' })).value;
    console.log('Usuario guardado:', usuarioGuardado);
    console.log('Contraseña guardada:', contrasenaGuardada);
    if (
      this.usuario === usuarioGuardado &&
      this.contrasenia === contrasenaGuardada &&
      this.usuario.length >= 3 && 
      this.usuario.length <= 8 &&
      this.contrasenia.length === 4 &&
      /^[a-zA-Z0-9]*$/.test(this.usuario) && 
      /^[0-9]*$/.test(this.contrasenia)
    ) {
     
      this.router.navigate(['/qr'], { queryParams: { usuario: this.usuario } });
    } else {
   
      console.log('Credenciales incorrectas o inválidas');
    }
  }
}



