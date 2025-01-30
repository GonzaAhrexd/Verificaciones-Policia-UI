import { Component } from '@angular/core';
import { CardActionsComponent } from '../../card-actions/card-actions.component';
import { AutosTableComponent } from './tabla-autos/autos-table.component';

@Component({
  selector: 'MostrarVehiculos',
  standalone: true,
  imports: [CardActionsComponent, AutosTableComponent],
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
