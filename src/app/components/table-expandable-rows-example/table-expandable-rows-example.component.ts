
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

import { getMarcas } from '../../api/marcas.service'
// Definimos el tipo de dato Marca

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
  }
]

@Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [ FlexRenderDirective],
  templateUrl: './table-expandable-rows-example.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MostrarMarcasComponent {
  data = signal<Marca[]>([]);

  public readonly sizesPages = signal<number[]>([5,10,25,50, 100])
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
    onPaginationChange: ( valueOrFunction ) => {

      typeof valueOrFunction === 'function'
        ? this.paginationState.update ( valueOrFunction )
        : this.paginationState.set ( valueOrFunction )


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
}