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

@Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './mostrar-marcas.component.html',
})


export class MostrarMarcasComponent {
  // Array donde se guardará la lista de marcas
    
  listaMarcas: any = []
  // Valores que se guardarán del formulario
  valores = []
  
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
  
  
  // Sección para agregar marcas      

  // Formulario
  form = signal<FormGroup>(
    new FormGroup(
      {
        Marca: new FormControl('', [Validators.required]),
        Descripcion: new FormControl('', [Validators.required]),
      })
  )

  // Mostrar si está en modo de agregado 
  showAddMarcas = false
  // Botón para cancelar
  cancelar() {
    this.showAddMarcas = false
  }

  // Botón para enviar
  sendMarca() {
    if (this.form().valid) {
      this.valores = this.form().value
      Swal.fire({
        title: '¿Está seguro de agregar esta marca?',
        icon: 'warning',
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Marca agregada',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            addMarcas(this.valores)
            setTimeout(() => {
              this.form().reset()
            })
          })
          // this.showAddMarcas = false
        } else if (result.isDenied) {
          Swal.fire('Marca no agregada', '', 'info')
        }
      })
    }
  }


}
