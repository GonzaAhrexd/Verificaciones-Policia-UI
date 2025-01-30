import { Component } from '@angular/core';
import { CardActionsComponent } from '../../../components/card-actions/card-actions.component';
import { AgregarVehiculoComponent } from './agregar-vehiculo/agregar-vehiculo.component';

Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [CardActionsComponent, AgregarVehiculoComponent],
  templateUrl: './marcas-vehiculos.component.html',
})
export class MarcasVehiculosComponent {

  getClickedSection(text: any) {
    console.log(text)
  }

  opcionesIndividuales = [
    { texto: "Búsqueda" },
    { texto: "Agregar" },
  ]
    
  opcionesTipoVehiculo = [
    {nombre: 'Automóvil'},
    {nombre: 'Motocicleta'},
]

}
