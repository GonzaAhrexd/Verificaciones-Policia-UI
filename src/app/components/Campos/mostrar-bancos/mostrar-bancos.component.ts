import { Component } from '@angular/core';
import { AgregarBancosComponent } from './agregar-bancos/agregar-bancos.component';
import { TablaBancosComponent } from './tabla-bancos/tabla-bancos.component';


@Component({
  selector: 'MostrarBancos',
  standalone: true,
  imports: [AgregarBancosComponent, TablaBancosComponent],
  templateUrl: './mostrar-bancos.component.html',
})
export class MostrarBancosComponent {

  showAddBancos = false
}
