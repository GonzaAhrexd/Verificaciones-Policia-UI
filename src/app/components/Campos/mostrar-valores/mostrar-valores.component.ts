import { Component } from '@angular/core';
import { AgregarValoresComponent } from './agregar-valores/agregar-valores.component';
import { ValoresTableComponent } from './tabla-valores/tabla-valores.component';

@Component({
  selector: 'MostrarValores',
  standalone: true,
  imports: [AgregarValoresComponent, ValoresTableComponent],
  templateUrl: './mostrar-valores.component.html',
})

export class MostrarValoresComponent {

  showAddValores = false
}
