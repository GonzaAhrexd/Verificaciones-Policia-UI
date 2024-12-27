import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],  // Importa RouterLink aquí
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  opcionesPagina = [
    { texto: 'Inicio', url: '/' },
    { texto: 'Editar campos', url: '/editar-campos' },
    { texto: 'Entregas', url: '/entregas' },
    { texto: 'Depositos', url: '/depositos' },
    { texto: 'Verificaciones', url: '/verificaciones' },
  ];
}
