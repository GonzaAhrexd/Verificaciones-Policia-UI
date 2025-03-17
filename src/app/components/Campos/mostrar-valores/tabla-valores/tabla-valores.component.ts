
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

import { getValores, deleteValor, updateValor } from '../../../../api/valores.service'
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
    accessorKey: 'valor',
    header: () => 'Valor',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'descripcion',
    header: () => 'Descripción',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'importe',
    header: () => 'Importe',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'limite',
    header: () => 'Límite',
    cell: info => info.getValue(),
  },
]

@Component({
  selector: 'ValoresTableComponent',
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

export class ValoresTableComponent {
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
    getValores().then((res) => {
      this.data.set(res);
    });
  }

  ngOnInit() {
    this.fetchMarcas();
  }

  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  // Editar una fila
  editThisRow(row: any) {
    // Haz un menú de editado modal utilizando Swal
    Swal.fire({
      title: 'Editando Marca',
      html: `
      <div class="flex flex-col">
      
      <span>Valor</span>
      <input  id="valor" class="swal2-input" value="${row.original.valor}">        
      
      <span>Descripción</span>
      <input  id="descripcion" class="swal2-input" value="${row.original.descripcion}">        
      
      <span>Importe</span>
      <input
      type="number"  id="importe" class="swal2-input" value="${row.original.importe}">        
      
      <span>Límite</span>
      <input type="date" id="limite" class="swal2-input" value="${row.original.limite}">        
      
      </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const valor = (document.getElementById('valor') as HTMLInputElement).value
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value
        const importe = (document.getElementById('importe') as HTMLInputElement).value
        let limite = (document.getElementById('limite') as HTMLInputElement).value || row.original.limite

        const values = {
          id: row.original.id,
          valor: valor,
          descripcion: descripcion,
          importe: importe,
          limite: limite,
        }


        await updateValor(values)

        Swal.fire({
          title: 'Formulario editado',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          // window.location.reload()
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
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'El valor ha sido eliminado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(async () => {
            await deleteValor(row.original.id)
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