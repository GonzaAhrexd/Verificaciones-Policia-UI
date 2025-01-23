import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormularios  } from '../../../api/formulario.service';
import { getUnidades } from '../../../api/unidades.service';
import { getVehicles, getVehicleByMake, getMotorcycles, getMotoByMake } from '../../../api/vehicles.service';

import Swal from 'sweetalert2';
import { editVerificacion, deleteVerificacion } from '../../../api/verificaciones.service';
@Component({
  selector: 'EditMode',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',
})

export class EditModeComponent {
  @Input() defaultData: any = {}

  formulariosOpciones: any = []
  unidadesOpciones: any = []
  vehiclesOpciones: any = []
  motorcycleOpciones: any = []
  modelOpciones: any = []
  modelOpcionesMoto: any = []
  setNoListMode:boolean = false

  
  ngOnInit() {
    this.fetchFormularios()
    this.fetchUnidades()
    this.obtenerVehiculos()
    this.obtenerMotocicletas()
  
    if(this.defaultData.tipo == 'Automóvil'){
      this.modoMoto = false
      
    getVehicleByMake(this.defaultData.marca).then((res) => {
      this.modelOpciones = res; 
    })
      
    } else {
      this.modoMoto = true
    
      getMotoByMake(this.defaultData.marca).then((res) => {
        this.modelOpciones = res; 
      })
    }
    
    this.form.patchValue({
      Unidad: this.defaultData.unidad,
      Recibo: this.defaultData.recibo,
      Fecha: this.defaultData.fecha,
      PlantaVerificadora: this.defaultData.plantaVerificadora,
      Tipo: this.defaultData.tipo,
      Responsable: this.defaultData.responsable,
      Formulario: this.defaultData.formulario,
      Marca: this.defaultData.marca,
      Modelo: this.defaultData.modelo,
      Anio: this.defaultData.anio,
      Dominio: this.defaultData.dominio,
      Importe: this.defaultData.importe,
    })

  }
  
  fetchFormularios(){
    getFormularios().then((res) => {
      this.formulariosOpciones = res;
    });
  }


  fetchUnidades(){
    getUnidades().then((res) => {
      this.unidadesOpciones = res;
    });
  }


  obtenerVehiculos = async () => {
    getVehicles().then((res) => {
      this.vehiclesOpciones = res;
      console.log(this.vehiclesOpciones)
    });
  }
  obtenerMotocicletas(){
    getMotorcycles().then((res) => {
      this.motorcycleOpciones = res; 
      console.log(this.motorcycleOpciones)
    });
  }

  
  opcionesTipoVehiculo = [
    {nombre: 'Automóvil'},
    {nombre: 'Motocicleta'},
]


modoMoto = false

verifyType = (type: any ) => {
  const typeVehicle = type.target.value

  if (typeVehicle == 'Automóvil') {
    this.modoMoto = false
  } else {
    this.modoMoto = true
  }   
 

}


  form: FormGroup = new FormGroup({
    Unidad: new FormControl('0', [Validators.required]),
    Recibo: new FormControl('', [Validators.required]),
    Fecha: new FormControl('', [Validators.required]),
    PlantaVerificadora: new FormControl('', [Validators.required]),
    Tipo: new FormControl('0', [Validators.required]),
    Responsable: new FormControl('', [Validators.required]),
    Formulario: new FormControl('', [Validators.required]),
    Marca: new FormControl('', [Validators.required]),
    Modelo: new FormControl('', [Validators.required]),
    Anio: new FormControl('', [Validators.required]),
    Dominio: new FormControl('', [Validators.required]),
    Importe: new FormControl('', [Validators.required]),

  })

  eliminarVerificacion(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF554C',
      cancelButtonColor: '#0C4A6E',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVerificacion(id)
        Swal.fire(
          {
            title: '¡Eliminado!',
            text: 'La verificación ha sido eliminada.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }
        )
      }
    })
  }

  editVerificacion(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: '¡Sí, enviar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.form.value)  
        this.form.value.id = this.defaultData.id

        console.log(this.form.value)
        editVerificacion(this.form.value)
        Swal.fire(
          {
            title: '¡Enviado!',
            text: 'La verificación ha sido enviada.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }
        )
      }
    })

  }
  
  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  onSelectChange(event: any) {

    getVehicleByMake(event.target.value).then((res) => {
      this.modelOpciones = res; 
    })

  }

 onSelectChangeMotorcycle(event: any) {
   
    getMotoByMake(event.target.value).then((res) => {
      this.modelOpcionesMoto = res; 
      console.log(this.modelOpcionesMoto)
    
    })

  }
  
  
 

}

