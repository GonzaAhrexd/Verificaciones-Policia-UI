// Librerías
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// Backend
import { getFormularios } from '../../api/formulario.service';
import { sendEntrega, getLastNumeroEntrega } from '../../api/entregas.service';
import { getUnidades } from '../../api/unidades.service';
import { UserService } from '../../api/user.service';

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
  imports: [ReactiveFormsModule ],
  templateUrl: './agregar-entrega.component.html',
})
export class AgregarEntregaComponent implements OnInit {
  
  constructor(private userService: UserService) { }

  // Variables
  unidades:Unidad[] = []
  renglones = 0
  showAdvertencia = false

  // Formulario principal con FormArray para los renglones
  form: FormGroup = new FormGroup({
    NroEntregaManual: new FormControl('', [Validators.required]),
    Fecha: new FormControl('', [Validators.required]),
    Unidad: new FormControl('0', [Validators.required]),
    renglonesEntregas: new FormArray([])  // FormArray para manejar los renglones
  });

  // Función para acceder a los renglones como FormArray
  get renglonesEntregas() {
    return this.form.get('renglonesEntregas') as FormArray;
  }

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
    renglonFormGroup.get('Desde')?.valueChanges.subscribe(() => this.actualizarCantidad(renglonFormGroup));
    renglonFormGroup.get('Hasta')?.valueChanges.subscribe(() => this.actualizarCantidad(renglonFormGroup));

  
    this.renglonesEntregas.push(renglonFormGroup);
    
  }

  actualizarCantidad(renglon: FormGroup) {
    const desde = renglon.get('Desde')?.value;
    const hasta = renglon.get('Hasta')?.value;
    if (desde && hasta) {
      renglon.get('Cantidad')?.setValue(hasta - desde);
    }
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

  async ngOnInit() {
    this.fetchUnidades()
    this.fetchFormulario();
    this.form.patchValue({
      Unidad: this.userService.getUser().unidad
    })
    
    const recentNumberGenerated = await getLastNumeroEntrega() + 1;
    console.log(recentNumberGenerated)
    this.form.get('NroEntregaManual')?.setValue(recentNumberGenerated);
    
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
        await sendEntrega(formData)
        Swal.fire({
          title: 'Entrega enviada',
          icon: 'success',
          confirmButtonColor: '#0C4A6E',
        }).then(() => {
          this.form.reset();
          this.renglonesEntregas.clear();
        })

        
        }
      
      })
  
  }

  
    
    imprimirFormulario(){

      // @ts-ignore
      const body = this.form.value.renglonesEntregas.map(renglon => [
        new Date(this.form.value.Fecha).toLocaleDateString("es-AR"),             // Fecha
        this.form.value.NroEntregaManual,      // N° Entrega
        this.form.value.Unidad,            // Unidad
        renglon.TipoFormulario,  // Formulario
        renglon.Desde,           // N° Inicial
        renglon.Hasta,           // N° Final
        renglon.Cantidad         // Cantidad
      ]);
    console.log(body)
  
      const pdf = new jsPDF();
  
      // Encabezado
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold'); // Cambia a negrita
      pdf.text('JEFATURA DE POLICÍA', 10, 10);
      pdf.text('DIRECCIÓN DE ADMINISTRACIÓN', 10, 16);
      pdf.text('VERIFICACIÓN DEL AUTOMOTOR', 10, 22);
  
      pdf.setFontSize(10);
      pdf.text('Fecha:', 160, 10);
      
      pdf.setFont('helvetica', 'normal'); // Vuelve a texto normal
      pdf.text(new Date().toLocaleDateString("es-AR"), 180, 10);
        
      // Tabla de datos
      autoTable(pdf, {
        startY: 30,
        head: [['Fecha', 'N° Entrega', 'Unidad', 'Formulario', 'N° Inicial', 'N° Final', 'Cantidad']],
        body: body,  // <-- Se pasa como un array de arrays (cada sub-array es una fila)
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [200, 200, 200] }
      });
  
      const finalY = (pdf as any).lastAutoTable.finalY + 20;

      // Firmas ajustadas dinámicamente
      pdf.text('_____________________________________', 10, finalY);
      pdf.text('Firma de Conformidad', 28, finalY + 5);
      pdf.text('Aclaración: .......................................................', 10, finalY + 10);
      pdf.text('Fecha y Hora: ..................................................', 10, finalY + 15);
    
      pdf.text('_____________________________________', 120, finalY);
      pdf.text('Firma Responsable de Entrega', 130, finalY + 5);

      
      // Descargar PDF
      // pdf.save('documento.pdf');
      const pdfUrl = pdf.output('bloburl');
      window.open(pdfUrl, '_blank');
    
        }
  
  



  preventScroll(event: WheelEvent): void {
    event.preventDefault();
  }

}
