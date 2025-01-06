import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';

type Unidad = {
  id: number,
  unidad: string, 
}


@Component({
  selector: 'app-buscar-entregas',
  standalone: true,
  imports: [],
  templateUrl: './buscar-entregas.component.html',
})
export class BuscarEntregasComponent {

  unidades:Unidad[] = []

  fetchUnidades() { 
    getUnidades().then((data) => {
      this.unidades = data
    })
  }

  ngOnInit() {
    this.fetchUnidades()
  }


}
