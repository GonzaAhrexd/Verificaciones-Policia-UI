import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormularios } from '../../api/formulario.service';
import { getUnidades } from '../../api/unidades.service';
import { getMarcasAutos, getModelosByMarcas } from '../../api/marcasAutos.service';
import { getMarcasMotos, getModelosByMarcaMoto } from '../../api/marcasMotos.service';
import { UserService } from '../../api/user.service';
import Swal from 'sweetalert2';
import { sendVerificacion } from '../../api/verificaciones.service';

@Component({
  selector: 'AgregarVerificacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-verificacion.component.html',
})

export class AgregarVerificacionComponent {
  constructor(private userService: UserService) { }

  formulariosOpciones: any = []
  unidadesOpciones: any = []
  vehiclesOpciones: any = []
  motorcycleOpciones: any = []
  modelOpciones: any = []
  modelOpcionesMoto: any = []
  setNoListMode: boolean = false


  ngOnInit() {
    this.fetchFormularios()
    this.fetchUnidades()
    this.obtenerVehiculos()
    this.obtenerMotocicletas()
    // Al campo responsable del formulario pasale el nombre del usuario logueado
    this.form.patchValue({
      Responsable: `${this.userService.getUser().nombre} ${this.userService.getUser().apellido}`,
      Unidad: this.userService.getUser().unidad
    })

  }

  fetchFormularios() {
    getFormularios().then((res) => {
      this.formulariosOpciones = res;
    });
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
    const formType = type.target.value

    // Con este formType buscalo dentro de formulariosOpciones y devuelve el campo tipoVehiculo, guardalo en una variable typeVehicle
    let typeVehicle = this.formulariosOpciones?.find((form: any) => form.formulario == formType).tipoVehiculo
    let importe = this.formulariosOpciones?.find((form: any) => form.formulario == formType).importe

    this.form.patchValue({
      Importe: importe
    })

    if (typeVehicle == 'Automóvil') {
      this.modoMoto = false
    } else {
      this.modoMoto = true
    }


  }


  form: FormGroup = new FormGroup({
    Unidad: new FormControl('0', [Validators.required]),
    Recibo: new FormControl('', [Validators.required, Validators.min(0)]),
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
  
  preventNegative(event: KeyboardEvent) {
    if (event.key === '-') {
      event.preventDefault();
    }
  }

  postVerificacion() {
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
        sendVerificacion(this.form.value)
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

