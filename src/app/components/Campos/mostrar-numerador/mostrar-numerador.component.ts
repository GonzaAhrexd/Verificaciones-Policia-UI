import { Component } from '@angular/core';


import { AgregarNumeradorComponent } from './agregar-numerador/agregar-numerador.component';
import { TablaNumeradorComponent } from './tabla-numerador/tabla-numerador.component';

@Component({
  selector: 'MostrarNumerador',
  standalone: true,
  imports: [AgregarNumeradorComponent, TablaNumeradorComponent],
  templateUrl: './mostrar-numerador.component.html',
})

export class MostrarNumeradorComponent {
  showAddNumerador = false

}
