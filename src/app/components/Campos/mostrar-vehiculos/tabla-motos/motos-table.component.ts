import { Component, Input, signal } from '@angular/core';
import {TableComponent } from './table/table.component'

import { getMarcasMotos } from '../../../../api/marcasMotos.service';
import { ColumnDef } from '@tanstack/angular-table';

type Marca = {
  id: number,
  marca: string,
}

@Component({
  selector: 'MotoTable',
  standalone: true,
  imports: [TableComponent ],
  template:  `
  @if(!isLoading){
    <TableComponent 
    [defaultColumns]="defaultColumns" 
    [data]="listaMarcaMotos"  />
   }@else {
     <p>Cargando...</p>
   }
   `
})


export class MotoTableComponent {
    
  // Variables
    isLoading = true
    listaMarcaMotos = []
  

    defaultColumns: ColumnDef<Marca>[] = [
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
    ]
  
    ngOnInit() {
      getMarcasMotos().then((data) => {
        this.listaMarcaMotos = data
        this.isLoading = false
      })
    }
  
 
    


}
