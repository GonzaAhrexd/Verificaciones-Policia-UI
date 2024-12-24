import { Component } from '@angular/core';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardActionsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  usuario = "Usuario"
}
