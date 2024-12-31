import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';


// Campos
import { MostrarMarcasComponent } from '../../components/Campos/mostrar-marcas/mostrar-marcas.component';
import { MostrarTiposComponent } from '../../components/Campos/mostrar-tipos/mostrar-tipos.component';
import { MostrarFormulariosComponent } from '../../components/Campos/mostrar-formularios/mostrar-formularios.component';
import { MostrarValoresComponent } from '../../components/Campos/mostrar-valores/mostrar-valores.component';

@Component({
  selector: 'app-editar-campos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CardActionsComponent,
    // Campos
     MostrarMarcasComponent, MostrarTiposComponent, MostrarFormulariosComponent, MostrarValoresComponent],
  templateUrl: './editar-campos.component.html',
})
export class EditarCamposComponent {

  opcionesDatos = [
    { texto: "Marcas" },
    { texto: "Tipos" },
    { texto: "Formularios"},
    { texto: "Valores"},
    { texto: "Bancos"},
    { texto: "Numerador"}
  ]
  opcion:string = ""
  
  
  getClickedSection(text: any) {
    console.log(text)

      this.opcion = text
  }

}
