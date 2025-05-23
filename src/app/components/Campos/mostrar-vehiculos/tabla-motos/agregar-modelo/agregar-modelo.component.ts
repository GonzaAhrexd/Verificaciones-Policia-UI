import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addModelo } from '../../../../../api/modeloMoto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'AgregarModeloMoto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-modelo.component.html',
})

export class AgregarModeloComponentMoto {

  @Input() marcaNombre:any 

  
    formulario:FormGroup = new FormGroup({
      Modelo: new FormControl('', [Validators.required]), 
      MarcaNombre: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    // Carga MarcaNombre con lo que viene en marcaNombre
    this.formulario.controls['MarcaNombre'].setValue(this.marcaNombre)
    }
  
  
  agregarModelo(){
      Swal.fire({
        title: '¿Estás seguro de que quieres agregar este modelo?',
        showDenyButton: true,
        confirmButtonText: `Sí`,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await addModelo(this.formulario.value) 
  
          Swal.fire('Modelo agregado', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No se ha agregado el modelo', '', 'info')
        }
      })
    }
    
}
