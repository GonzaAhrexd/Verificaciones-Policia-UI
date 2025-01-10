import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarDepositoComponent } from '../../components/agregar-deposito/agregar-deposito.component';
import { BuscarDepositoComponent } from '../../components/buscar-deposito/buscar-deposito.component';
@Component({
  selector: 'app-depositos',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, AgregarDepositoComponent, BuscarDepositoComponent ],
  templateUrl: './depositos.component.html',
})

export class DepositosComponent {

    
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar depósito"},
  ]

  opcion = ""

  getClickedSection(text: any) {
    this.opcion = text
  }


}
