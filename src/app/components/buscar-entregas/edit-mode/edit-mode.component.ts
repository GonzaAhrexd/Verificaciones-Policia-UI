import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { getFormularios } from '../../../api/formulario.service';
import { sendEntrega, updateEntrega } from '../../../api/entregas.service';
import { getUnidades } from '../../../api/unidades.service';
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
  selector: 'EditMode',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponent implements OnInit {

  @Input() defaultData:any = []
  
  unidades:Unidad[] = []


  // Formulario principal con FormArray para los renglones
  form: FormGroup = new FormGroup({
    NroEntrega: new FormControl(''),
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('', [Validators.required]),
    renglonesEntregas: new FormArray([])  // FormArray para manejar los renglones
  });

  // Función para acceder a los renglones como FormArray
  get renglonesEntregas() {
    return this.form.get('renglonesEntregas') as FormArray;
  }

  renglones = 0
  // Función para agregar un nuevo renglon
  addRenglones(renglonData: any = null) {
    const renglonFormGroup = new FormGroup({
      Id: new FormControl(renglonData?.id || null),
      TipoFormulario: new FormControl(renglonData?.tipoFormulario || '', [Validators.required]),
      NroRenglon: new FormControl(renglonData?.nroRenglon || this.renglonesEntregas.length + 1, [Validators.required]),
      Desde: new FormControl(renglonData?.desde || '', [Validators.required]),
      Hasta: new FormControl(renglonData?.hasta || '', [Validators.required]),
      Cantidad: new FormControl(renglonData?.cantidad || '', [Validators.required]),
    }, { validators: this.hastaMayorQueDesdeValidator() });

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
    if(this.defaultData){
      this.setFormValues()
    }
  }

  setFormValues() {
    // Establecer valores de fecha y unidad
    this.form.patchValue({
      NroEntrega: this.defaultData.nroEntrega,
      Fecha: this.formatDate(this.defaultData.fecha),
      Unidad: this.defaultData.unidad
    });


    
    // Establecer los valores de los renglones (si existen)
    if (this.defaultData.renglonesEntregas && this.defaultData.renglonesEntregas.length > 0) {
      this.defaultData.renglonesEntregas.forEach((renglon: any) => {
        this.addRenglones(renglon);
      });
    }
  }
  

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        await sendEntrega(this.form.value)
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

  saveChanges(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Desea guardar los cambios?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C4A6E',
      cancelButtonColor: '#FF554C',
       confirmButtonText: 'Guardar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(this.form.value)
        await updateEntrega(this.defaultData.nroEntrega, this.form.value)
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
        }).then(() => {
          // Window?.location.reload()   
        })  
        }
    })
  }


  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

}
