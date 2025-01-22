
// Importamos cosas de Angular
import {  Component, Input, signal } from '@angular/core'
import { EditModeComponent } from '../edit-mode/edit-mode.component'
// Importamos cosas de Angular Table de TanStack
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/angular-table'

// Definimos el componente
@Component({
  selector: 'TableComponent',
  standalone: true,
  imports: [FlexRenderDirective, EditModeComponent],
 templateUrl: './table.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

// Definimos la clase del componente
export class TableComponent {
  
  @Input() defaultColumns: ColumnDef<any>[] = [] // Columnas por defecto
  @Input() data:any = ([]) // Datos de la tabla
  @Input() onDelete: Function = () => {}; // Función de eliminación
  @Input() onEdit: Function = () => {}; // Función de edición
  importeTotal = 0
  editMode = false 

  // Señales para manejar la paginación
  public readonly sizesPages = signal<number[]>([5, 10, 25, 50, 100])
  public readonly paginationState = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,

  })  

  ngOnInit(){
    this.data.forEach((element: { importe: number; }) => {
      this.importeTotal += element.importe
    });
  }
 
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