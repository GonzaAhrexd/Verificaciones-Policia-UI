// Angular
import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Angular Table
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// SweetAlert
import Swal from 'sweetalert2';
// API
import { addMarcas, getMarcas } from '../../../api/marcas.service';

import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';

@Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [AgregarMarcaComponent, ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './mostrar-marcas.component.html',
})


export class MostrarMarcasComponent {
  // Array donde se guardará la lista de marcas
    
  listaMarcas: any = []
  showAddMarcas = false
  // Valores que se guardarán del formulario
  
  // Sección para cargar datos 
  displayedColumns: string[] = ['id', 'marca', 'descripcion'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor() {
    this.loadMarcas();
  }
  
  async loadMarcas() {
    const data = await getMarcas();
    this.dataSource.data = data; // Asignar datos a la tabla
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
