import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { buscarEntrega, deleteEntrega } from '../../api/entregas.service';
import { TableComponent } from './table/table.component'
import { ColumnDef } from '@tanstack/angular-table';
import Swal from 'sweetalert2';
type Unidad = {
  id: number,
  unidad: string,
}


// Definimos columnas por defecto

@Component({
  selector: 'app-buscar-entregas',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './buscar-entregas.component.html',
})
export class BuscarEntregasComponent {

  
  defaultColumns: ColumnDef<any>[] = [
    {
      accessorKey: 'nroEntrega',
      header: () => 'NroEntrega',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'fecha',
      header: () => 'Fecha',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'unidad',
      header: () => 'Unidad',
      cell: info => info.getValue(),
  
    }
  ]

  
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
  
  isEmpty = true


  async fetchEntregas() {
    try {
      const entrega = await buscarEntrega(this.buscarEntregasForm.value)
      this.listaEntregas = entrega
      this.isEmpty = false
      console.log(this.listaEntregas)
    } catch (error) {
      console.error(error)
    }
  }
 
  deleteThisRow(row: any) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEntrega(row.original.nroEntrega)
        Swal.fire({
          title: 'Eliminado!',
          text: 'La entrega ha sido eliminada.',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          this.fetchEntregas()
        }
          
        )
      }
    })

    console.log("Deleted")
  }

  editThisRow(){
    console.log("Edit")
  }

}
