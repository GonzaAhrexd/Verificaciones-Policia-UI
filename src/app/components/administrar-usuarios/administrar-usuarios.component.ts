import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../api/unidades.service';
import { buscarUsuarioDNI, buscarUsuarios } from '../../api/auth.service';

@Component({
  selector: 'editar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './administrar-usuarios.component.html',
})
export class EditarUsuariosComponent {

    formulario: FormGroup = new FormGroup({
      DNI: new FormControl('', []),
      Rol: new FormControl('', []),
      Unidad: new FormControl('', []),
    })


    modoDNI = true

    opcionesRol = [
      { texto: "Administrador" },
      { texto: "Usuario" }, 
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

      listaUsuarios = []

      async BuscarUsuarios(){
   
        if(this.modoDNI){
          this.FiltrarDNI()
        }else{
          this.FiltrarRol()
        }
      }


      async FiltrarDNI(){
         
        try{
          let buscarPorDNI =  await buscarUsuarioDNI(this.formulario.value.DNI)
          this.listaUsuarios = buscarPorDNI

          console.log(this.listaUsuarios)
        }catch(err){
          console.log(err)
        }

      }



      async FiltrarRol(){
        try{
          let buscarPorRol =  await buscarUsuarios(this.formulario.value)
          this.listaUsuarios = buscarPorRol

          console.log(this.listaUsuarios)
        
        }catch(err){
          console.log(err)
        }
    
      }




}
