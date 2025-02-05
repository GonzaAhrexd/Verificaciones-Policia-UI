import { Component, Input, signal } from '@angular/core';
import { EditModeComponent } from '../edit-mode/edit-mode.component';
import { AgregarModeloComponent  } from '../agregar-modelo/agregar-modelo.component';
import { ListarModelosComponent } from '../listar-modelos/listar-modelos.component';
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/angular-table'


@Component({
  selector: 'TableComponent',
  standalone: true,
  imports: [FlexRenderDirective, EditModeComponent, AgregarModeloComponent, ListarModelosComponent ],
    templateUrl: './table.component.html'
})
export class TableComponent {

  @Input() defaultColumns: ColumnDef<any>[] = [] // Columnas por defecto
  @Input() data:any = ([]) // Datos de la tabla
  editMode = false 
  setAddModelo = false

  // Señales para manejar la paginación
  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100])
  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })  


 
// Función para expandir una fila
  expandThisRow(row: any){    
    row.toggleExpanded(!row.getIsExpanded())
  }

  // Función para crear la tabla
  table = createAngularTable(() => ({
    data: this.data,
    columns: this.defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    enableExpandingRows: true,
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


}
