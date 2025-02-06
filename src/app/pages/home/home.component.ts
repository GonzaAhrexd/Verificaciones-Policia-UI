import { Component } from '@angular/core';
// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SidebarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  usuario = "Usuario"



}
