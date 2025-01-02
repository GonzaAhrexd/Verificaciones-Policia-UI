// Angular
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// SweetAlert
import Swal from 'sweetalert2';
// API
import { createNumerador} from '../../../../api/numerador.service';

@Component({
  selector: 'AgregarNumerador',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-numerador.component.html',
})

export  class AgregarNumeradorComponent {
  valores = []
   // Sección para agregar marcas      

  // Formulario
  form = signal<FormGroup>(
    new FormGroup(
      {
        Objeto: new FormControl('', [Validators.required]),
        ultimoNumero: new FormControl('', [Validators.required]),
      })
  )

  // Mostrar si está en modo de agregado 

  @Output() showAddNumerador = new EventEmitter<boolean>()
  
  // Evitar el scroll
  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  // Botón para cancelar
  cancelar() {
    this.showAddNumerador.emit(false)
  }



  // Botón para enviar
  sendMarca() {
    if (this.form().valid) {
      this.valores = this.form().value


      console.log(this.valores)

      Swal.fire({
        title: '¿Está seguro de agregar este numerador?',
        icon: 'warning',
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Numerador agregado',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }).then(() => {
            createNumerador(this.valores)
            setTimeout(() => {
              this.form().reset()
            })
          })
          // this.showAddMarcas = false
        } else if (result.isDenied) {
          Swal.fire('Numerador no agregado', '', 'info')
        }
      })
    }
  }


}
