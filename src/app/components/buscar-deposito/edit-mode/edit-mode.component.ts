import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUnidades } from '../../../api/unidades.service';
@Component({
  selector: 'EditMode',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-mode.component.html',
})
export class EditModeComponent {

  @Input() defaultData:any = {}
  unidades:any = []
 form: FormGroup = new FormGroup({
    NroDeposito: new FormControl(''),
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('', [Validators.required]),
    Banco: new FormControl('', [Validators.required]),
    Cuenta: new FormControl('', [Validators.required]),
    Tipo: new FormControl('', [Validators.required]),
    Monto: new FormControl('', [Validators.required]), 
  });

  // Rellenar con los datos de defaultData

  ngOnInit() {
    this.form.patchValue({
      NroDeposito: this.defaultData.nroDeposito,
      Fecha: this.defaultData.fecha,
      Unidad: this.defaultData.unidad,
      Banco: this.defaultData.banco,
      Cuenta: this.defaultData.cuenta,
      Tipo: this.defaultData.tipo,
      Monto: this.defaultData.monto,
    });
    console.log(this.defaultData)
    console.log(this.form.value);
  }

    fetchUnidades() {
      getUnidades().then((data) => {
        this.unidades = data
      })
    }
  


}
