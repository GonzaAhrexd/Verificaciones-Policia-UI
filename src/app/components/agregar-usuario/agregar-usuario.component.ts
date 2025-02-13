import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../api/unidades.service';

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
    { texto: "Administrador" },
    { texto: "Usuario" }, 
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
      console.log(this.formulario.value)
    }

}
