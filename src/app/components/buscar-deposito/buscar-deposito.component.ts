import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';
import { buscarDeposito, getDepositos, deleteDepositos, editDeposito } from '../../api/deposito.service'
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from './table/table.component'
import { ColumnDef } from '@tanstack/angular-table';

@Component({
  selector: 'app-buscar-deposito',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './buscar-deposito.component.html',


})
export class BuscarDepositoComponent {
  

    defaultColumns: ColumnDef<any>[] = [
      {
        accessorKey: 'nroDeposito',
        header: () => 'NroDeposito',
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
      },
      {
        accessorKey: 'banco',
        header: () => 'Banco',
        cell: info => info.getValue(),
      },      
      {
        accessorKey: 'tipo',
        header: () => 'Tipo',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'importe',
        header: () => 'Importe',
        cell: info => '$' + info.getValue(),
      }
    ]
    
    buscarDepositosForm: FormGroup = new FormGroup({
      Unidad: new FormControl('0', [Validators.required]),
      Desde: new FormControl('', [Validators.required]),
      Hasta: new FormControl('', [Validators.required]),
    });


    unidades: any = []
    listaIngresos: any = []
    depositos: any = []
    isEmpty: boolean = true

    
    async fetchDepositos(){
          try {
            this.depositos = []
            this.isEmpty = true 
      
            const entrega = await buscarDeposito(this.buscarDepositosForm.value)
            this.depositos = entrega
            this.isEmpty = false

            console.log(this.depositos)
          
          } catch (error) {
            console.error(error)
          }
    }


    fetchUnidades() {
      getUnidades().then((data) => {
        this.unidades = data
      })
    }

    ngOnInit() {
      this.fetchUnidades()
    }

    deleteThisRow(row: any) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDepositos(row.original.nroDeposito).then(() => {
            Swal.fire(
              '¡Borrado!',
              'El registro ha sido eliminado.',
              'success'
            )

          })
        }
      })

    }
        
    editThisRow(row: any) {
      

    }

}
