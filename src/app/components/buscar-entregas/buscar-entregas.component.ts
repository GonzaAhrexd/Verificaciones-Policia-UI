import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { buscarEntrega } from '../../api/entregas.service';
type Unidad = {
  id: number,
  unidad: string,
}


@Component({
  selector: 'app-buscar-entregas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buscar-entregas.component.html',
})
export class BuscarEntregasComponent {

  unidades: Unidad[] = []
  listaEntregas:any = []

  buscarEntregasForm: FormGroup = new FormGroup({
    Unidad: new FormControl('', [Validators.required]),
    Desde: new FormControl('', [Validators.required]),
    Hasta: new FormControl('', [Validators.required]),
  });

  fetchUnidades() {
    getUnidades().then((data) => {
      this.unidades = data
    })
  }

  ngOnInit() {
    this.fetchUnidades()
  }

  async fetchEntregas() {
    try {
      const entrega = await buscarEntrega(this.buscarEntregasForm.value)
      this.listaEntregas = entrega

      console.log(this.listaEntregas)
    } catch (error) {
      console.error(error)
    }
  }
}
