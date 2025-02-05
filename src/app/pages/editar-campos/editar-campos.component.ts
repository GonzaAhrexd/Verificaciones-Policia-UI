import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';


// Campos
import { MostrarTiposComponent } from '../../components/Campos/mostrar-tipos/mostrar-tipos.component';
import { MostrarFormulariosComponent } from '../../components/Campos/mostrar-formularios/mostrar-formularios.component';
import { MostrarValoresComponent } from '../../components/Campos/mostrar-valores/mostrar-valores.component';
import { MostrarBancosComponent } from '../../components/Campos/mostrar-bancos/mostrar-bancos.component';
import { MostrarUnidadesComponent } from '../../components/Campos/mostrar-unidades/mostrar-unidades.component';
import { MostrarVehiculosComponent } from "../../components/Campos/mostrar-vehiculos/mostrar-vehiculos.component";

@Component({
  selector: 'app-editar-campos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CardActionsComponent,
    // Campos
    MostrarTiposComponent, MostrarFormulariosComponent, MostrarValoresComponent, MostrarBancosComponent, MostrarUnidadesComponent, MostrarVehiculosComponent],
  templateUrl: './editar-campos.component.html',
})
export class EditarCamposComponent {

  opcionesDatos = [
    { texto: "Tipos" },
    { texto: "Unidades" },
    { texto: "Formularios"},
    { texto: "Bancos"},
    { texto: "Vehículos"}	
  ]

  opcion:string = ""
  
  getClickedSection(text: any) {
      this.opcion = text
  }
}
