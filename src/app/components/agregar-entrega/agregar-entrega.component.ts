import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { getFormularios } from '../../api/formulario.service';
import { sendEntrega } from '../../api/entregas.service';
import { getUnidades } from '../../api/unidades.service';
import { UserService } from '../../api/user.service';
import Swal from 'sweetalert2';
type Formulario = {
  id: number
  formulario: string
}
type Unidad = {
  id: number
  unidad: string
}

@Component({
  selector: 'app-agregar-entrega',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-entrega.component.html',
})
export class AgregarEntregaComponent implements OnInit {
  
  constructor(private userService: UserService) { }


  unidades:Unidad[] = []


  // Formulario principal con FormArray para los renglones
  form: FormGroup = new FormGroup({
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('0', [Validators.required]),
    renglonesEntregas: new FormArray([])  // FormArray para manejar los renglones
  });

  // Función para acceder a los renglones como FormArray
  get renglonesEntregas() {
    return this.form.get('renglonesEntregas') as FormArray;
  }

  renglones = 0
  // Función para agregar un nuevo renglon
  addRenglones() {
    this.renglones++;
    const renglonFormGroup = new FormGroup({
      TipoFormulario: new FormControl('0', [Validators.required]),
      NroRenglon: new FormControl(this.renglones, [Validators.required]),
      Desde: new FormControl('', [Validators.required]),
      Hasta: new FormControl('', [Validators.required]),
      Cantidad: new FormControl('', [Validators.required]),
    }, {validators: this.hastaMayorQueDesdeValidator()});
    this.renglonesEntregas.push(renglonFormGroup);
    
  }
  hastaMayorQueDesdeValidator = () => {
    return (control: any): { [key: string]: any } | null => {
      const desde = control.get('Desde')?.value;
      const hasta = control.get('Hasta')?.value;
      return hasta && desde && hasta < desde ? { 'hastaMenorQueDesde': true } : null;
    };
  }

  deleteLesson(lessonIndex: number) {
    this.renglonesEntregas.removeAt(lessonIndex);
  
  }

  data: any = [];

  fetchFormulario() {
    getFormularios().then((res) => {
      this.data = res;
    });
  }

  ngOnInit() {
    this.fetchUnidades()
    this.fetchFormulario();
    this.form.patchValue({
      Unidad: this.userService.getUser().unidad
    })

    if(this.userService.getUser().rol != "Administrador" && this.userService.getUser().rol != "Fondo"){
      this.form.controls['Unidad'].disable({ onlySelf: true });  
    }


  }

  fetchUnidades(){
    getUnidades().then((res) => {
      this.unidades = res;
    });
  }

  // Función para enviar la entrega (ejemplo de uso)
  postEntrega() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Desea enviar la entrega?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
       confirmButtonText: 'Enviar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = this.form.getRawValue(); // getRawValue() incluye los campos deshabilitados
       
        console.log(formData)
        await sendEntrega(formData)
        Swal.fire({
          title: 'Entrega enviada',
          icon: 'success',
        }).then(() => {
          this.form.reset();
          this.renglonesEntregas.clear();
        })

        
        }
      
      })
  
  }


  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

}
