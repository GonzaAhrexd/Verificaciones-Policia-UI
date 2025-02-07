import { Component } from '@angular/core';
// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HomeButtonsComponent } from '../../components/home-buttons/home-buttons.component';
type Opcion = { 
   texto: string, ruta: string 
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SidebarComponent, HomeButtonsComponent],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  usuario = "Usuario"

  Opciones: Opcion[] = [
    {texto:"Entregas", ruta:"/entregas" },
    {texto:"Depósitos", ruta:"/depositos" },
    {texto:"Verificaciones", ruta:"/verificaciones" }
  ]



}
