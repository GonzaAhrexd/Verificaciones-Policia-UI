import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { getFormularios } from '../../api/formulario.service';

type Formulario = {
  id: number
  formulario: string
}

@Component({
  selector: 'app-agregar-entrega',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-entrega.component.html',
})
export class AgregarEntregaComponent implements OnInit {
  
  // Un array de unidades (opciones del select)
  unidades = [
    { nombre: "Metropolitana" },
    { nombre: "Saenz Peña" },
    { nombre: "Juan José Castelli" },
    { nombre: "General San Martín" },
    { nombre: "Charata" }
  ];

  // Formulario principal con FormArray para los renglones
  form: FormGroup = new FormGroup({
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('', [Validators.required]),
    renglones: new FormArray([])  // FormArray para manejar los renglones
  });

  // Función para acceder a los renglones como FormArray
  get renglones() {
    return this.form.get('renglones') as FormArray;
  }

  // Función para agregar un nuevo renglon
  addRenglones() {
    const renglonFormGroup = new FormGroup({
      TipoFormulario: new FormControl('', [Validators.required]),
      Desde: new FormControl('', [Validators.required]),
      Hasta: new FormControl('', [Validators.required]),
      Cantidad: new FormControl('', [Validators.required]),
    });
    this.renglones.push(renglonFormGroup);
  }

  deleteLesson(lessonIndex: number) {
    this.renglones.removeAt(lessonIndex);
    console.log(this.form.value)
  
  }

  data: any = [];

  fetchFormulario() {
    getFormularios().then((res) => {
      this.data = res;
    });
  }

  ngOnInit() {
    this.fetchFormulario();
  }

  // Función para enviar la entrega (ejemplo de uso)
  sendEntrega() {
    console.log(this.form.value);
  }
}