// Angular
import {  Component } from '@angular/core';
// API
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';

import { MarcasTableComponent } from './MarcasTable/marcas-table.component';


@Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [MarcasTableComponent, AgregarMarcaComponent ],
  templateUrl: './mostrar-marcas.component.html',
})


export class MostrarMarcasComponent {
  // Cambiar entre modos de vista (Agregar o listar)
  showAddMarcas = false
}
