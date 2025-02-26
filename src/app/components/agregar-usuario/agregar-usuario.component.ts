import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../api/unidades.service';
import { altaUsuario } from '../../api/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-usuario.component.html',
})
export class AgregarUsuarioComponent {


  formulario: FormGroup = new FormGroup({
    DNI: new FormControl('', [Validators.required]),
    TipoUsuario: new FormControl('', [Validators.required]),
    Rol: new FormControl('', [Validators.required]),
    Unidad: new FormControl('', [Validators.required]),
  })



  opcionesRol = [
    { texto: "Planta" }, 
    { texto: "Fondo" }, 
    { texto: "Administrador" },
  ]


  opcionesTipoUsuario = [
    { texto: "Civil" },
    { texto: "Agente Policial" },
  ]

  unidadesOpciones: any = []

  ngOnInit() {
    this.fetchUnidades()
  }


  async fetchUnidades(){
    try{
      const res = await getUnidades()
      this.unidadesOpciones = res;
    }catch(err){
      console.log(err)
    }
    }

    showUnidades(){
      console.log(this.unidadesOpciones)
    }

    agregarUsuario(){
      Swal.fire({
        title: '¿Estás seguro de que deseas agregar este usuario?',
        showDenyButton: true,
        confirmButtonText: `Sí`,
        denyButtonText: `No`,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try{
            const res = await altaUsuario(this.formulario.value)
            Swal.fire('Usuario agregado con éxito', '', 'success')
          }catch(err){
            Swal.fire('Error al agregar el usuario', '', 'error')
          }
        } else if (result.isDenied) {
          Swal.fire('No se ha agregado el usuario', '', 'info')
        }
      })
    }

}
