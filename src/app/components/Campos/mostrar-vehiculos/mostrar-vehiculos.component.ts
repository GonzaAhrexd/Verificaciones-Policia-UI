import { Component } from '@angular/core';
import { CardActionsComponent } from '../../card-actions/card-actions.component';
import { AutosTableComponent } from './tabla-autos/autos-table.component';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import {MotoTableComponent } from './tabla-motos/motos-table.component'
@Component({
  selector: 'MostrarVehiculos',
  standalone: true,
  imports: [CardActionsComponent, AutosTableComponent, AgregarMarcaComponent, MotoTableComponent],
  templateUrl: './mostrar-vehiculos.component.html',
})

export class MostrarVehiculosComponent {    
  ShowAddVehiculo = false
  isAutomovil = true; // true = automovil, false = motocicleta

  opcionesListaMarcas = [
    {texto: 'Automóviles'},
    {texto: 'Motocicletas'},
  ]

  getClickedSection(event: any) {
    if(event == 'Automóviles') {
      this.isAutomovil = true
    }
    else {
      this.isAutomovil = false
    }
  }


}
