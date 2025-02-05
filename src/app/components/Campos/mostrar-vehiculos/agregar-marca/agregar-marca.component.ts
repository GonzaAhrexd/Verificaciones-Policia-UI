import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { postMarcaAuto } from '../../../../api/marcasAutos.service'
import { postMarcaMoto } from '../../../../api/marcasMotos.service'


import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-marca',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-marca.component.html',

})

export class AgregarMarcaComponent {

 formulario:FormGroup = new FormGroup({
      Marca: new FormControl('', [Validators.required]), 
      Tipo: new FormControl('', [Validators.required]),
  })


  tipos = [
    {valor: "Automóvil"},
    {valor: "Motocicleta"},
  ]


  agregarMarca(){
    Swal.fire({
      title: '¿Está seguro de agregar esta marca?',
      showDenyButton: true,
      confirmButtonText: `Sí`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Marca agregada con éxito',
          showConfirmButton: false,
        }).then(async () => {
        
          if(this.formulario.value.Tipo == "Automóvil"){
            await postMarcaAuto(this.formulario.value)
          }else if(this.formulario.value.Tipo == "Motocicleta"){
            await postMarcaMoto(this.formulario.value)
          }

        
        })
      } else if (result.isDenied) {
        Swal.fire('No se ha agregado la marca', '', 'info')
      }
    })
  }
}
