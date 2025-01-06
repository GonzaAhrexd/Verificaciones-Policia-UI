import { Component } from '@angular/core';
import { AgregarUnidadesComponent } from './agregar-unidades/agregar-tipo.component'
import { UnidadesTableComponent } from './tabla-unidades/tipos-table.component';
@Component({
  selector: 'MostrarUnidades',
  standalone: true,
  imports: [AgregarUnidadesComponent, UnidadesTableComponent],
  templateUrl: './mostrar-unidades.component.html',
})
export class MostrarUnidadesComponent {
    showAddUnidades = false
}
