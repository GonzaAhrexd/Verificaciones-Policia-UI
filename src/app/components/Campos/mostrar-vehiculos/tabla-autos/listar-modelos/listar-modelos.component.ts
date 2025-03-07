import { Component, Input } from '@angular/core';
import { getModelosByMarcas } from '../../../../../api/marcasAutos.service';
import { ColumnDef } from '@tanstack/angular-table';
import { TableComponentModelosAutos } from './table/table.component';

type Modelo = {
  modelo: string
  marcaID: number
  id: number
}

@Component({
  selector: 'ListarModelosAuto',
  standalone: true,
  imports: [TableComponentModelosAutos],
  template: `
  @if(!isLoading) {
   <TableComponentModelosAutos 
     [defaultColumns]="columnas" 
     [data]="modelos" 
     />
  } @else{
    <p>Cargando...</p>
  }
  `,
  // templateUrl: './listar-modelos.component.html',
})



export class ListarModelosComponentAuto {

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
    
}
