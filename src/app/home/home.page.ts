import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fechanac: string= '';

  @ViewChild('tituloHome', { read: ElementRef }) tituloHome!: ElementRef;
  @ViewChild('nombreInput', { read: ElementRef }) nombreInput!: ElementRef;
  @ViewChild('apellidoInput', { read: ElementRef }) apellidoInput!: ElementRef;
  @ViewChild('fechaNacimiento', { read: MatInput }) fechaNacimiento!: MatInput;
  constructor(
    private route: ActivatedRoute,
    private animationCtrl: AnimationController 
  ) {}

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
    });

    this.animateTitleLoop();
  }

  async animateTitleLoop() {
    while (true) {
      await this.animateTitle('right');
      await this.animateTitle('left');
    }
  }

  async animateTitle(direction: string) {
    const titleAnimation: Animation = this.animationCtrl.create()
      .addElement(this.tituloHome.nativeElement)
      .duration(2500)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(' + (direction === 'right' ? '0' : '-100%') + ')' },
        { offset: 1, transform: 'translateX(' + (direction === 'right' ? '100%' : '0') + ')' }
      ]);

    await titleAnimation.play();
  }

  animateSlideOut(element: ElementRef) {
    const originalTransform = element.nativeElement.style.transform;
  
    const slideOutAnimation: Animation = this.animationCtrl.create()
      .addElement(element.nativeElement)
      .duration(1000)
      .keyframes([
        { offset: 0, opacity: '1', transform: 'translateX(0)' },
        { offset: 0.5, opacity: '0.2', transform: 'translateX(100%)' },
        { offset: 0.5, opacity: '1', transform: 'translateX(0)' }
      ]);
  
    slideOutAnimation.play();
   
  }
  
  

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fechaNacimiento.value = '';

    this.animateSlideOut(this.nombreInput);
    this.animateSlideOut(this.apellidoInput);
  }
}
