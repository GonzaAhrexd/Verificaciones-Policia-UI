import { Component, Input } from '@angular/core';
import { getModelosByMarcaMoto } from '../../../../../api/marcasMotos.service';
import { ColumnDef } from '@tanstack/angular-table';
import { TableComponentModelosMoto } from './table/table.component';


type Modelo = {
  modelo: string
  marcaID: number
  id: number
}

@Component({
  selector: 'ListarModelosMoto',
  standalone: true,
  imports: [TableComponentModelosMoto],
  template: `
  @if(!isLoading) {
   <TableComponentModelosMoto 
     [defaultColumns]="columnas" 
     [data]="modelos" 
     />
  } @else{
    <p>Cargando...</p>
  }
  `,
})



export class ListarModelosComponentMoto {

  @Input() marcaNombre = '';  
  modelos: Modelo[] = []
  isLoading = true

  ngOnInit() {
    getModelosByMarcaMoto(this.marcaNombre).then((data) => {
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
