import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { editModelo, deleteModelo } from '../../../../../../../api/modeloMoto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'EditModeModelo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponentModelo {
  @Input() defaultData: any = {};

   formulario:FormGroup = new FormGroup({
        Id: new FormControl('', [Validators.required]),
        Modelo: new FormControl('', [Validators.required]), 
        MarcaID: new FormControl('', [Validators.required])
    })

    ngOnInit() {
      this.formulario.patchValue({
        Id: this.defaultData['id'],
        Modelo: this.defaultData['modelo'],
        MarcaID: this.defaultData['marcaID']
      })
    }


  editarMarca(){
    Swal.fire(
      {
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        confirmButtonText: 'Sí, editar!'
      }
    ).then(async (result) => {  
      if (result.isConfirmed) {
        await editModelo(this.formulario.value)
        Swal.fire(
         {
          title: '¡Editado!',
          text: 'El registro ha sido editado.',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }
        )
      }
    }
    )
  }

  eliminarMarca(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteModelo(this.defaultData['id'])
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })  
  
  }

}
