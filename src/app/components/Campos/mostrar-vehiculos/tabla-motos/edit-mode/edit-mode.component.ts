import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { editMarcasMotos, deleteMarcasMotos } from '../../../../../api/marcasMotos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mode',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',

})

export class EditModeComponent {

    @Input() defaultData:any = []
  
    formulario:FormGroup = new FormGroup({
      Id: new FormControl('', [Validators.required]),
      Marca: new FormControl('', [Validators.required]), 
  })

  
  eliminarMarca(){
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar esta marca?',
      showDenyButton: true,
      confirmButtonText: `Sí`,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(this.formulario.value)
        await deleteMarcasMotos(this.formulario.value.Id)
        Swal.fire('Marca eliminada', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado la marca', '', 'info')
      }
    })
  
  }
  
  
  editarMarca(){
    Swal.fire({
      title: '¿Estás seguro de que quieres editar esta marca?',
      showDenyButton: true,
      confirmButtonText: `Sí`,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(this.formulario.value)
        await editMarcasMotos(this.formulario.value )
        Swal.fire('Marca editada', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha editado la marca', '', 'info')
      }
    })
  
  }
  
  // Carga el formulario con los datos de defaultData
   
  ngOnInit() {
    this.formulario.patchValue({
      Id: this.defaultData['id'],
      Marca: this.defaultData['marca'],
    })
  


}

}