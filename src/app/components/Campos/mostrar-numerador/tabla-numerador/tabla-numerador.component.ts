
// Importamos cosas de Angular
import { Component, signal } from '@angular/core'

// Importamos cosas de Angular Table de TanStack
import {
  ColumnDef,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/angular-table'

import { getNumeradors, deleteNumerador, updateNumerador } from '../../../../api/numerador.service' 

import Swal from 'sweetalert2'
// Definimos el tipo de dato Marca
import { TableComponent } from '../../../table/table.component'

type Formulario = {
  id: number
  formulario: string
 }

// Definimos columnas por defecto
const defaultColumns: ColumnDef<Formulario>[] = [
  {
    accessorKey: 'id',
    header: () => 'ID',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'objeto',
    header: () => 'Objeto',
    cell: info => info.getValue(),
  },
  
  {
    accessorKey: 'ultimoNumero',
    header: () => 'Último número',
    cell: info => info.getValue(),
  },
]

@Component({
  selector: 'BancosTable',
  standalone: true,
  imports: [ TableComponent],
  template: `
    <TableComponent 
    [defaultColumns]="defaultColumns" 
    [data]="data" 
    [onDelete]="deleteThisRow" 
    [onEdit]="editThisRow" />
  `
})

export class TablaNumeradorComponent {

  data = signal<Formulario[]>([]);
  defaultColumns = defaultColumns
  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100])
  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,

  })

// Crear tabla
  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: this.paginationState(),
    },
    onPaginationChange: (valueOrFunction) => {

      typeof valueOrFunction === 'function'
        ? this.paginationState.update(valueOrFunction)
        : this.paginationState.set(valueOrFunction)


    }
  }));

  fetchMarcas() {
    getNumeradors().then((res) => {
      this.data.set(res);
    });
  }

  ngOnInit() {
    this.fetchMarcas();
  }

  // Editar una fila
  editThisRow(row: any) {
    // Haz un menú de editado modal utilizando Swal
    Swal.fire({
      title: 'Editando Numerador',
      html: `
      <div class="flex flex-col">
      <span>Objeto</span>
      <input  id="objeto" class="swal2-input" value="${row.original.objeto}">        
      <span>Último número</span>
      <input  id="ultimoNumero" class="swal2-input" value="${row.original.ultimoNumero}">        
      
      
      </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const objeto = (document.getElementById('objeto') as HTMLInputElement).value
        const ultimoNumero = (document.getElementById('ultimoNumero') as HTMLInputElement).value

        const values = {
          id: row.original.id,
          objeto: objeto,
          ultimoNumero: ultimoNumero
        }

        updateNumerador(values)

        Swal.fire({
          title: 'Numerador editado',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          window.location.reload()
        })
      }
    })
  }

  // Eliminar una fila
  deleteThisRow(row: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'El numerador ha sido eliminado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            deleteNumerador(row.original.id)
            window.location.reload()
          })
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el registro',
            icon: 'error',
            confirmButtonColor: '#0C4A6E',
          })

        }
      }
    })
  }
}