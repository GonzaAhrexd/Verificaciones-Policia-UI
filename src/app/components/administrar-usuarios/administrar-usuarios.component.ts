import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../api/unidades.service';
import { buscarUsuarioDNI, buscarUsuarios } from '../../api/auth.service';
import { ColumnDef } from '@tanstack/angular-table';
import { TableComponent } from './table/table.component';
@Component({
  selector: 'editar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './administrar-usuarios.component.html',
})
export class EditarUsuariosComponent {

    formulario: FormGroup = new FormGroup({
      DNI: new FormControl('', []),
      Rol: new FormControl('', []),
      Unidad: new FormControl('', []),
    })

    
      defaultColumns: ColumnDef<any>[] = [
        {
          accessorKey: 'id',
          header: () => 'ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'nombre',
          header: () => 'Nombre',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'apellido',
          header: () => 'Apellido',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'nombre_de_usuario',
          header: () => 'Nombre de usuario',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'rol',
          header: () => 'Rol',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'unidad',
          header: () => 'Unidad',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'dni',
          header: () => 'DNI',
          cell: info => info.getValue(),
        }
      ]
      
      modoDNI = true
      unidadesOpciones: any = []
      isEmpty = true




    opcionesRol = [
      { texto: "Planta" }, 
      { texto: "Fondo" }, 
      { texto: "Administrador" },
    ]

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

      listaUsuarios:[] = []

      async BuscarUsuarios(){
   

        if(this.modoDNI){
          this.FiltrarDNI()

        }else{
          this.FiltrarRol()
        }
      }


      async FiltrarDNI(){
         
        try{

          
          this.listaUsuarios = []
          this.isEmpty = true 

          const buscarPorDNI =  await buscarUsuarioDNI(this.formulario.value.DNI)

          // @ts-ignore
          this.listaUsuarios.push(buscarPorDNI)
          this.isEmpty = false
          console.log(this.listaUsuarios)
        }catch(err){
          console.log(err)
        }

      }



      async FiltrarRol(){
        try{
          this.isEmpty = true 
          this.listaUsuarios = []

          const  buscarPorRol =  await buscarUsuarios(this.formulario.value)
          this.listaUsuarios = buscarPorRol
          this.isEmpty = false
          console.log(this.listaUsuarios)
        
        }catch(err){
          console.log(err)
        }
    
      }




}
