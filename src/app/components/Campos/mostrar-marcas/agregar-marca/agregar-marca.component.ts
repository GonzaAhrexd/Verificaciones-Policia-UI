// Angular
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// SweetAlert
import Swal from 'sweetalert2';
// API
import { addMarcas } from '../../../../api/marcas.service';

@Component({
  selector: 'app-agregar-marca',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-marca.component.html',
})
export class AgregarMarcaComponent {
  valores = []
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

  @Output() showAddMarcas = new EventEmitter<boolean>()
  
  
  // Botón para cancelar
  cancelar() {
    this.showAddMarcas.emit(false)

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
