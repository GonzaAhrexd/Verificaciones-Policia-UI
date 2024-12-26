import { AfterViewInit, Component, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addMarcas } from '../../../api/marcas.service';
import { getMarcas } from '../../../api/marcas.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


import Swal from 'sweetalert2';

@Component({
  selector: 'MostrarMarcas',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './mostrar-marcas.component.html',
})
export class MostrarMarcasComponent implements AfterViewInit {
  showAddMarcas = false
  listaMarcas = []
  valores = []


  constructor() {
    this.getMarcas()
  }
  
  dataSource: any
  displayedColumns: string[] = ['marca', 'descripcion'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  async getMarcas() {
    this.listaMarcas = await getMarcas()
    this.dataSource = new MatTableDataSource<any>(this.listaMarcas);
  }
  
  async ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    } else {
      console.error('Paginator no encontrado');
    }
  }


  form = signal<FormGroup>(
    new FormGroup(
      {
        Marca: new FormControl('', [Validators.required]),
        Descripcion: new FormControl('', [Validators.required]),
      })
  )

  cancelar() {
    this.showAddMarcas = false
  }

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
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

