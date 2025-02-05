import { Component, Input } from '@angular/core';
import { getModelosByMarcaMoto } from '../../../../../api/marcasMotos.service';
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
     />
  } @else{
    <p>Cargando...</p>
  }
  `,
})



export class ListarModelosComponent {

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
