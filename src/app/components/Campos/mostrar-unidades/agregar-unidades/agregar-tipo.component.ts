// Angular
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// SweetAlert
import Swal from 'sweetalert2';
// API
import { createUnidad } from '../../../../api/unidades.service';

@Component({
  selector: 'AgregarUnidades',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-tipo.component.html',
})
export class AgregarUnidadesComponent {
  valores = []
   // Sección para agregar marcas      

  // Formulario
  form = signal<FormGroup>(
    new FormGroup(
      {
        Unidad: new FormControl('', [Validators.required]),
      })
  )

  // Mostrar si está en modo de agregado 

  @Output() showAddUnidades = new EventEmitter<boolean>()
  
  
  // Botón para cancelar
  cancelar() {
    this.showAddUnidades.emit(false)

  }
  // Botón para enviar
  sendMarca() {
    if (this.form().valid) {
      this.valores = this.form().value
      Swal.fire({
        title: '¿Está seguro de agregar esta unidad?',
        icon: 'warning',
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Unidad agregado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            createUnidad(this.valores)
            setTimeout(() => {
              this.form().reset()
            })
          })
          // this.showAddMarcas = false
        } else if (result.isDenied) {
          Swal.fire('Unidad no agregada', '', 'info')
        }
      })
    }
  }


}
