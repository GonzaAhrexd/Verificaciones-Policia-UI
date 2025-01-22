import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarVerificacionComponent } from '../../components/agregar-verificacion/agregar-verificacion.component';
@Component({
  selector: 'app-verificaciones',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, AgregarVerificacionComponent],
  templateUrl: './verificaciones.component.html',
})
export class VerificacionesComponent {
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar verificación"},

  ]

  opcion:string = ""

  getClickedSection(text: any) {
    this.opcion = text
  }
}
