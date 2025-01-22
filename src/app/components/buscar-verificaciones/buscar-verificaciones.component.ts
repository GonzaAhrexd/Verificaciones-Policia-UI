import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getVerificaciones } from '../../api/verificaciones.service';
import { getUnidades } from '../../api/unidades.service';
import { TableComponent } from './table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
@Component({
  selector: 'BuscarVerificaciones',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './buscar-verificaciones.component.html',
})
export class BuscarVerificacionesComponent {
  defaultColumns: ColumnDef<any>[] = [
    {
      accessorKey: 'recibo',
      header: () => 'Recibo',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'tipo',
      header: () => 'Tipo',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'responsable',
      header: () => 'Responsable',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'formulario',
      header: () => 'Formulario',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'marca',
      header: () => 'Marca',
      cell: info => info.getValue(),
    },
    
    {
      accessorKey: 'modelo',
      header: () => 'Modelo',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'anio',
      header: () => 'Año',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'dominio',
      header: () => 'Dominio',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'importe',
      header: () => 'Importe',
      cell: info => info.getValue(),
    },
  ]
  
  buscarVerificacionesForm: FormGroup = new FormGroup({ 
    Unidad: new FormControl('0', [Validators.required]),
    Fecha: new FormControl('', [Validators.required]),

  });

  unidades:any = []
  isEmpty = true


  getUnidades = async () => {
    getUnidades().then((res) => {
      this.unidades = res;
      
    });
  }

  ngOnInit() {
    this.getUnidades()
  }
  verificaciones = []

  fetchVerificaciones() {
    getVerificaciones(this.buscarVerificacionesForm.value).then((res) => {
      this.verificaciones = res;

      if(this.verificaciones.length > 0){
        this.isEmpty = false
      }

    })

}

editThisRow(row: any){
  console.log(row)
}

deleteThisRow(row: any){
  console.log(row)
}


}
