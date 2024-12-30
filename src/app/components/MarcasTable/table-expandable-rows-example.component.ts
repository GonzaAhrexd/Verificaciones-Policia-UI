
// Importamos cosas de Angular
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'

// Importamos cosas de Angular Table de TanStack
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/angular-table'

import { deleteMarcas, getMarcas, editMarca } from '../../api/marcas.service'
import Swal from 'sweetalert2'
import { FormControl, FormGroup, Validators } from '@angular/forms'
// Definimos el tipo de dato Marca
import { TableComponent } from '../table/table.component'

type Marca = {
  id: number
  marca: string
  descripcion: string
}

// Definimos columnas por defecto
const defaultColumns: ColumnDef<Marca>[] = [
  {
    accessorKey: 'id',
    header: () => 'ID',
    cell: info => info.getValue(),
  },

  {
    accessorKey: 'marca',
    header: () => 'Marca',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'descripcion',
    header: () => 'Descripcion',
    cell: info => info.getValue(),
  },



]

@Component({
  selector: 'ListMarcas',
  standalone: true,
  imports: [FlexRenderDirective, TableComponent],
  templateUrl: './table-expandable-rows-example.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CRUDMarcas {
  data = signal<Marca[]>([]);
  defaultColumns = defaultColumns

  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100])
  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,

  })


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
    getMarcas().then((res) => {
      console.log(res)
      this.data.set(res);
    });
  }

  ngOnInit() {
    this.fetchMarcas();
  }

  showAlert(row: any) {
    console.log(row.original.marca)
    alert('Hola' + row.original.marca);
  }

  // Editar
  form = signal<FormGroup>(
      new FormGroup(
        {
          Marca: new FormControl('', [Validators.required]),
          Descripcion: new FormControl('', [Validators.required]),
        })
    )
  
  

  editThisRow(row: any) {
    // Haz un menú de editado modal utilizando Swal
    Swal.fire({
      title: 'Editando Marca',
      html: `
      <div class="flex flex-col">
      <span>Marca</span>
      <input  id="marca" class="swal2-input" value="${row.original.marca}"> 
      <span>Descripción</span>
      <input formControlName="Descripcion" id="descripcion" class="swal2-input" value="${row.original.descripcion}">
      </div>
       
      </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: `Guardar`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const marca = (document.getElementById('marca') as HTMLInputElement).value
        const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value

        const values = {
          id: row.original.id,
          marca: marca,
          descripcion: descripcion
        }
        
        editMarca(row.original.id, values)
        Swal.fire({
          title: 'Marca editada',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          window.location.reload()
        })
      }
    })
  }
valores = []
    sendMarca(id: number) {
      if (this.form().valid) {
        this.valores = this.form().value
        Swal.fire({
          title: '¿Está seguro de agregar esta marca?',
          icon: 'warning',
          confirmButtonColor: '#0C4A6E',
          cancelButtonColor: '#FF554C',
          showCancelButton: true,
          confirmButtonText: `Sí`,
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Marca agregada',
              icon: 'success',
              confirmButtonColor: '#0C4A6E',
            }).then(() => {
              editMarca(id, this.valores)
              setTimeout(() => {
                this.form().reset()
              })
            })
            // this.showAddMarcas = false
          } else if (result.isDenied) {
            Swal.fire('Marca no agregada', '', 'info')
          }
        })
      }
    }
  
    
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
            title: 'El registro ha sido eliminado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            deleteMarcas(row.original.id)
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