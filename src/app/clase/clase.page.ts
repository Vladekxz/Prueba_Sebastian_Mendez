import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  constructor(private route: ActivatedRoute) {}

  datos: string = '';
  nombreProfesor: string = '';
  hora: string = '';
  sala: string = '';
  dia: string = '';
  timestamp: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';


  extraerInformacion() {
    const nombreProfesorMatch = this.datos.match(/Nombre Profesor: ([^,]+)/);
    const horaMatch = this.datos.match(/Hora: ([^,]+)/);
    const salaMatch = this.datos.match(/sala: ([^,]+)/);
    const diaMatch = this.datos.match(/Dia: ([^,]+)/);

    this.nombreProfesor = nombreProfesorMatch ? nombreProfesorMatch[1] : '';
    this.hora = horaMatch ? horaMatch[1] : '';
    this.sala = salaMatch ? salaMatch[1] : '';
    this.dia = diaMatch ? diaMatch[1] : '';

   
    this.obtenerNombreYRutDesdePreferencias();
  }

  async obtenerNombreYRutDesdePreferencias() {
    try {
     
      const nombreGuardado = await Preferences.get({ key: 'nombre' });
      const rutGuardado = await Preferences.get({ key: 'rut' });
      const apellidoGuardado = await Preferences.get({key: 'apellido'})
     
      this.nombre = nombreGuardado.value || ''; 
      this.rut = rutGuardado.value || ''; 
      this.apellido = apellidoGuardado.value || '';
    } catch (error) {
      console.error('Error al obtener datos desde las preferencias:', error);
    }
  }

  ngOnInit() {
 
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    this.timestamp = currentDate.toLocaleDateString('es-ES', options);

    this.route.queryParams.subscribe((params) => {
      const string = params['result'];
     
      if (string) {
        this.datos = string;
        console.log(this.datos);
        this.extraerInformacion();
      }
    });
  }

}
