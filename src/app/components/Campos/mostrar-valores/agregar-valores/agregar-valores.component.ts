// Angular
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// SweetAlert
import Swal from 'sweetalert2';
// API
import { createValor } from '../../../../api/valores.service';


@Component({
  selector: 'AgregarValores',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-valores.component.html',
})

export class AgregarValoresComponent {
  valores = []
   // Sección para agregar marcas      

  // Formulario
  form = signal<FormGroup>(
    new FormGroup(
      {
        Valor: new FormControl('', [Validators.required]),
        Descripcion: new FormControl('', [Validators.required]),
        Importe: new FormControl('', [Validators.required]),
        Limite: new FormControl('', [Validators.required]),
      })
  )

  // Mostrar si está en modo de agregado 

  @Output() showAddValores = new EventEmitter<boolean>()
  
  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }
  // Botón para cancelar
  cancelar() {
    this.showAddValores.emit(false)
  }
  
  // Botón para enviar
  sendMarca() {
    if (this.form().valid) {
      this.valores = this.form().value
      Swal.fire({
        title: '¿Está seguro de agregar este valor?',
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
            createValor(this.valores)
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
