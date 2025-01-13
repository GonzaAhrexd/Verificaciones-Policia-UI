import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service'
import { getBancos } from '../../api/bancos.service';
import { sendDepositos } from '../../api/deposito.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
type Unidad = {
  id: number
  unidad: string
}

type Banco = {
  id: number
  banco: string
}


@Component({
  selector: 'app-agregar-deposito',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-deposito.component.html',

})


export class AgregarDepositoComponent {

  unidades:Unidad[] = []
  bancos: Banco[] = []

  form: FormGroup = new FormGroup({
      Fecha: new FormControl('', [Validators.required]),
      Unidad: new FormControl('0', [Validators.required]),
      Banco: new FormControl('0', [Validators.required]),
      Cuenta: new FormControl('', [Validators.required]),
      Tipo: new FormControl('0', [Validators.required]),
      Importe: new FormControl('', [Validators.required]),
    });
    

  tipoOpciones = [
    {value: "Depósito Efectivo"},
    {value: "Interdepósito"},
  ]

  ngOnInit() {
    this.fetchUnidades()
    this.fetchBancos()
  }


  fetchUnidades(){
    getUnidades().then((res) => {
      this.unidades = res;
    });
  }

  fetchBancos(){
    getBancos().then((res) => {
      this.bancos = res;
    });
  }

  
  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

  postDeposito(){
    try{
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        confirmButtonText: 'Sí, enviar!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.form.value)
          sendDepositos(this.form.value).then((res) => {
            Swal.fire(
             {
              title: 'Depósito enviado',
              icon: 'success',
              confirmButtonColor: '#0C4A6E',
              confirmButtonText: 'Aceptar'
             }
            )
          })
        }
      })
    }catch(e){
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al enviar el depósito',
        icon: 'error',
        confirmButtonColor: '#0C4A6E',
        confirmButtonText: 'Aceptar'
      })
    }
  }

}
