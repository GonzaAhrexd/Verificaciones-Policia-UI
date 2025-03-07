import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { editMarcasMotos, deleteMarcasMotos } from '../../../../../api/marcasMotos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'EditModeMotos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',

})

export class EditModeComponentMotos {

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
        try{
          await deleteMarcasMotos(this.formulario.value.Id)
           Swal.fire({
                      title: 'Marca eliminada',
                      icon: 'success',
                      confirmButtonColor: '#0C4A6E',
                    })
                  } catch (error) {
                    Swal.fire({
                      title: 'Error',
                      text: 'No se pudo eliminar la marca',
                      icon: 'error',
                      confirmButtonColor: '#0C4A6E',
                    })
        }
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
        try{
          await editMarcasMotos(this.formulario.value )
          Swal.fire({
            title: 'Marca editada',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          })
        } catch(error){
        Swal.fire({
          title: 'Error',
          text: 'No se pudo editar la marca',
          icon: 'error',
          confirmButtonColor: '#0C4A6E',
        })
        }
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