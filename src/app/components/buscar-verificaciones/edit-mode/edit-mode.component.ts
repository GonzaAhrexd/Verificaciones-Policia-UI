import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormularios } from '../../../api/formulario.service';
import { getUnidades } from '../../../api/unidades.service';
// import { getVehicles, getVehicleByMake, getMotorcycles, getMotoByMake } from '../../../api/vehicles.service';

import { getMarcasAutos, getModelosByMarcas } from '../../../api/marcasAutos.service';
import { getMarcasMotos, getModelosByMarcaMoto } from '../../../api/marcasMotos.service';

import Swal from 'sweetalert2';
import { editVerificacion, deleteVerificacion } from '../../../api/verificaciones.service';
import { UserService } from '../../../api/user.service';
@Component({
  selector: 'EditModeVerificacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',
})

export class EditModeComponentVerificaciones {

  constructor(private userService: UserService) { }

  @Input() defaultData: any = {}

  formulariosOpciones: any = []
  unidadesOpciones: any = []
  vehiclesOpciones: any = []
  motorcycleOpciones: any = []
  modelOpciones: any = []
  modelOpcionesMoto: any = []
  setNoListMode: boolean = false


 async ngOnInit() {

    this.fetchUnidades()
    this.obtenerVehiculos()
    this.obtenerMotocicletas()

    this.fetchFormularios().then(async () => {

      const formType = this.defaultData.tipo
      
      let typeVehicle = this.formulariosOpciones?.find((form: any) => form.formulario == formType).tipoVehiculo
      this.modoMoto = typeVehicle !== 'Automóvil'; // Esto garantiza que se establezca antes de la consulta

      if (!this.modoMoto) {

        const autos = await getModelosByMarcas(this.defaultData.marca)
        this.modelOpciones = autos

      } else {
        console.log(this.defaultData.marca)


        const motos = await getModelosByMarcaMoto(this.defaultData.marca)
       

        this.modelOpcionesMoto = motos


        console.log(motos)
      }
    })

    this.form.patchValue({
      Id: this.defaultData.id,
      Unidad: this.defaultData.unidad,
      Recibo: this.defaultData.recibo,
      Fecha: this.formatDate(this.defaultData.fecha),
      Tipo: this.defaultData.tipo,
      Responsable: this.defaultData.responsable,
      Formulario: this.defaultData.formulario,
      Marca: this.defaultData.marca,
      Modelo: this.defaultData.modelo,
      Anio: this.defaultData.anio,
      Dominio: this.defaultData.dominio,
      Importe: this.defaultData.importe,
      estaAnulado: this.defaultData.estaAnulado,
    })

    if (this.userService.getUser().rol != "Administrador") {
      this.form.controls['Unidad'].disable({ onlySelf: true });
    }

  }

  async fetchFormularios() {
    this.formulariosOpciones = await getFormularios()
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchUnidades() {
    getUnidades().then((res) => {
      this.unidadesOpciones = res;
    });
  }


  obtenerVehiculos = async () => {
    getMarcasAutos().then((res) => {
      this.vehiclesOpciones = res;
    });
  }
  obtenerMotocicletas() {
    getMarcasMotos().then((res) => {
      this.motorcycleOpciones = res;
    });
  }


  opcionesTipoVehiculo = [
    { nombre: 'Automóvil' },
    { nombre: 'Motocicleta' },
  ]

  modoMoto = false

  verifyType = (type: any) => {
    const typeVehicle = type.target.value
    this.modoMoto = typeVehicle !== 'Automóvil'
  }


  form: FormGroup = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    Unidad: new FormControl('0', [Validators.required]),
    Recibo: new FormControl('', [Validators.required]),
    Fecha: new FormControl('', [Validators.required]),
    Tipo: new FormControl('0', [Validators.required]),
    Responsable: new FormControl('', [Validators.required]),
    Formulario: new FormControl('', [Validators.required]),
    Marca: new FormControl('', [Validators.required]),
    Modelo: new FormControl('', [Validators.required]),
    Anio: new FormControl('', [Validators.required]),
    Dominio: new FormControl('', [Validators.required]),
    Importe: new FormControl('', [Validators.required]),
    estaAnulado: new FormControl(false),
  })

  eliminarVerificacion(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
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
            confirmButtonColor: '#0C4A6E',
          }
        )
      }
    })
  }

  preventNegative(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  editVerificacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
      confirmButtonText: '¡Sí, enviar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = this.form.getRawValue();

        await editVerificacion(formData)
        Swal.fire(
          {
            title: '¡Enviado!',
            text: 'La verificación ha sido enviada.',
            icon: 'success',
            confirmButtonColor: '#0C4A6E',
          }
        )
      }
    })

  }

  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  onSelectChange(event: any) {

    getModelosByMarcas(event.target.value).then((res) => {
      this.modelOpciones = res;
    })

  }

  onSelectChangeMotorcycle(event: any) {
    getModelosByMarcaMoto(event.target.value).then((res) => {
      this.modelOpcionesMoto = res;
    })

  }

}

