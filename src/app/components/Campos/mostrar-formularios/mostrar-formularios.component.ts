// Angular
import { Component } from '@angular/core';

// Componentes
import { AgregarFormularioComponent } from './agregar-formularios/agregar-formulario.component';
import { FormularioTableComponent } from './tabla-formularios/formulario-table.component';

@Component({
  selector: 'MostrarFormularios',
  standalone: true,
  imports: [AgregarFormularioComponent, FormularioTableComponent],
  templateUrl: './mostrar-formularios.component.html',
})

export class MostrarFormulariosComponent {
  showAddFormularios = false
}
