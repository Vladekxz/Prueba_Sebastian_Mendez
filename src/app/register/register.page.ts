import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  contrasena: string = '';


  usuarioError: string = '';
  nombreError: string = '';
  apellidoError: string = '';
  rutError: string = '';
  carreraError: string = '';
  contrasenaError: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  async registrar() {

    const usuarioValido = this.usuario.length > 0 && this.usuario.length <= 15;
    const nombreValido =
      this.nombre.length > 0 &&
      this.nombre.length <= 30 &&
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre);
    const apellidoValido =
      this.apellido.length > 0 &&
      this.apellido.length <= 30 &&
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.apellido);
    const rutValido = /^\d{9}$/.test(this.rut);
    const carreraValida = this.carrera.length > 0 && this.carrera.length <= 50;
    const contrasenaValida = /^\d{4}$/.test(this.contrasena);

 
    this.usuarioError = '';
    this.nombreError = '';
    this.apellidoError = '';
    this.rutError = '';
    this.carreraError = '';
    this.contrasenaError = '';

    if (!usuarioValido) {
      this.usuarioError = 'El usuario debe tener entre 1 y 15 caracteres.';
    }
    if (!nombreValido) {
      this.nombreError =
        'El nombre debe tener entre 1 y 30 caracteres y solo letras (sin caracteres especiales).';
    }
    if (!apellidoValido) {
      this.apellidoError =
        'El apellido debe tener entre 1 y 30 caracteres y solo letras (sin caracteres especiales).';
    }
    if (!rutValido) {
      this.rutError = 'El RUT debe ser un número de 9 dígitos sin guión.';
    }
    if (!carreraValida) {
      this.carreraError =
        'La carrera debe tener entre 1 y 50 caracteres.';
    }
    if (!contrasenaValida) {
      this.contrasenaError = 'La contraseña debe tener exactamente 4 dígitos.';
    }

    if (
      usuarioValido &&
      nombreValido &&
      apellidoValido &&
      rutValido &&
      carreraValida &&
      contrasenaValida
    ) {
 
      await Preferences.set({ key: 'usuario', value: this.usuario });
      await Preferences.set({ key: 'nombre', value: this.nombre });
      await Preferences.set({ key: 'apellido', value: this.apellido });
      await Preferences.set({ key: 'rut', value: this.rut });
      await Preferences.set({ key: 'carrera', value: this.carrera });
      await Preferences.set({ key: 'contrasena', value: this.contrasena });
      this.router.navigate(['/login']);
    }
  }
}

