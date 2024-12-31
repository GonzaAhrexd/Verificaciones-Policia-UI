// Angular
import {  Component } from '@angular/core';
// Componentes
import { AgregarTipoComponent  } from './agregar-tipos/agregar-tipo.component'
import { TiposTableComponent } from './tabla-tipos/tipos-table.component';

@Component({
  selector: 'MostrarTipos',
  standalone: true,
  imports: [ TiposTableComponent, AgregarTipoComponent],
  templateUrl: './mostrar-tipos.component.html',
})

export class MostrarTiposComponent {
    // Cambiar entre modos de vista (Agregar o listar)
    showAddTipos = false
    
}
