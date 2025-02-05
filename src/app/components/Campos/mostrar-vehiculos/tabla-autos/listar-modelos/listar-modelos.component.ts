import { Component, Input } from '@angular/core';
import { getModelosByMarcas } from '../../../../../api/marcasAutos.service';
import { ColumnDef } from '@tanstack/angular-table';
import { TableComponent } from './table/table.component';

type Modelo = {
  modelo: string
  marcaID: number
  id: number
}

@Component({
  selector: 'ListarModelos',
  standalone: true,
  imports: [TableComponent],
  template: `
  @if(!isLoading) {
   <TableComponent 
     [defaultColumns]="columnas" 
     [data]="modelos" 
     [onDelete]="deleteThisRow" 
     [onEdit]="editThisRow" />
  } @else{
    <p>Cargando...</p>
  }
  `,
  // templateUrl: './listar-modelos.component.html',
})



export class ListarModelosComponent {

  @Input() marcaNombre = '';  
  modelos: Modelo[] = []
  isLoading = true

  ngOnInit() {
    getModelosByMarcas(this.marcaNombre).then((data) => {
      this.modelos = data
      this.isLoading = false
    })

  }

    columnas: ColumnDef<Modelo>[] = [
      {
        accessorKey: 'id',
        header: () => 'ID',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'modelo',
        header: () => 'Modelo',
        cell: info => info.getValue(),
      },
    ]

    deleteThisRow = (row: any) => {
      console.log('Deleting row', row)
    }

    editThisRow = (row: any) => {
      console.log('Editing row', row)
    }
    
}
