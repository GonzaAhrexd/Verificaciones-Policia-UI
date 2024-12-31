// Angular
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// SweetAlert
import Swal from 'sweetalert2';
// API
import { createFormulario } from '../../../../api/formulario.service';

@Component({
  selector: 'AgregarFormulario',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-formulario.component.html',
})
export class AgregarFormularioComponent {
  valores = []
   // Sección para agregar marcas      

  // Formulario
  form = signal<FormGroup>(
    new FormGroup(
      {
        Formulario: new FormControl('', [Validators.required]),
      })
  )

  // Mostrar si está en modo de agregado 

  @Output() showAddTipos = new EventEmitter<boolean>()
  
  
  // Botón para cancelar
  cancelar() {
    this.showAddTipos.emit(false)

  }
  // Botón para enviar
  sendMarca() {
    if (this.form().valid) {
      this.valores = this.form().value
      Swal.fire({
        title: '¿Está seguro de agregar este tipo?',
        icon: 'warning',
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Tipo agregado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            createFormulario(this.valores)
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
