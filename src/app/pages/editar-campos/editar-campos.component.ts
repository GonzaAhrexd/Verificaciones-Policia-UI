import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { MostrarMarcasComponent } from '../../components/Campos/mostrar-marcas/mostrar-marcas.component';
import { CommonModule } from '@angular/common';  // Importa CommonModule


@Component({
  selector: 'app-editar-campos',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CardActionsComponent, MostrarMarcasComponent],
  templateUrl: './editar-campos.component.html',
  // styleUrl: './editar-campos.component.css'
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
