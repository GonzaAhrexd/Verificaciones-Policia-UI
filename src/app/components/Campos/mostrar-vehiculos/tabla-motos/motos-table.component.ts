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
    [data]="listaMarcaMotos" 
    [onDelete]="deleteThisRow" 
    [onEdit]="editThisRow" />
   }@else {
     <p>Cargando...</p>
   }
   `
})


export class MotoTableComponent {

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

    isLoading = true
    listaMarcaMotos = []
  
    ngOnInit() {
      getMarcasMotos().then((data) => {
        this.listaMarcaMotos = data
        this.isLoading = false
        console.log(this.listaMarcaMotos)
      })
    }
  
    deleteThisRow = (row: any) => {
      console.log('Deleting row', row)
    }
    editThisRow = (row: any) => {
      console.log('Editing row', row)
    }
    


}
