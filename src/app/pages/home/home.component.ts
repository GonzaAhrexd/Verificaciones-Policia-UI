import { Component } from '@angular/core';
// Componentes
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableExpandableRowsExample } from '../../components/table-expandable-rows-example/table-expandable-rows-example.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardActionsComponent, SidebarComponent, TableExpandableRowsExample],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  usuario = "Usuario"
}
