import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { eliminarModelo, editModelo } from '../../../../../../../api/modeloAuto.service';
@Component({
  selector: 'app-editar-modelo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-modelo.component.html',
})

export class EditarModeloComponent {
  @Input() defaultData:any = {}
 
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

  eliminarMarca(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarModelo(this.defaultData['id'])
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

  editarMarca(){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await editModelo(this.formulario.value)
        Swal.fire(
          '¡Editado!',
          'El registro ha sido editado.',
          'success'
        )
      }
    })

  }

}
