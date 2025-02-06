import { Component } from '@angular/core';
import { getUnidades } from '../../api/unidades.service';
import { buscarDeposito, getDepositos, deleteDepositos, editDeposito } from '../../api/deposito.service'
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from './table/table.component'
import { ColumnDef } from '@tanstack/angular-table';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-buscar-deposito',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './buscar-deposito.component.html',


})
export class BuscarDepositoComponent {
  

    defaultColumns: ColumnDef<any>[] = [
      {
        accessorKey: 'nroDeposito',
        header: () => 'NroDeposito',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'fecha',
        header: () => 'Fecha',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'unidad',
        header: () => 'Unidad',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'banco',
        header: () => 'Banco',
        cell: info => info.getValue(),
      },      
      {
        accessorKey: 'tipo',
        header: () => 'Tipo',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'importe',
        header: () => 'Importe',
        cell: info => '$' + info.getValue(),
      }
    ]
    
    buscarDepositosForm: FormGroup = new FormGroup({
      Unidad: new FormControl('0', [Validators.required]),
      Desde: new FormControl('', [Validators.required]),
      Hasta: new FormControl('', [Validators.required]),
    });


    unidades: any = []
    listaIngresos: any = []
    depositos: any = []
    isEmpty: boolean = true

    
    async fetchDepositos(){
          try {
            this.depositos = []
            this.isEmpty = true 
      
            const entrega = await buscarDeposito(this.buscarDepositosForm.value)
            this.depositos = entrega
            this.isEmpty = false

            console.log(this.depositos)
          
          } catch (error) {
            console.error(error)
          }
    }


    fetchUnidades() {
      getUnidades().then((data) => {
        this.unidades = data
      })
    }

    ngOnInit() {
      this.fetchUnidades()
    }

    deleteThisRow(row: any) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0C4A6E',
        cancelButtonColor: '#FF554C',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDepositos(row.original.nroDeposito).then(() => {
            Swal.fire(
              '¡Borrado!',
              'El registro ha sido eliminado.',
              'success'
            )

          })
        }
      })

    }
        
    editThisRow(row: any) {
      

    }

     imprimir(){
      
      
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Depósitos');
    
      worksheet.mergeCells('A1:B1'); // Unir celdas
      worksheet.getCell('A1').value = 'JEFATURA DE POLICÍA';
      // worksheet.getCell('A1').alignment = { horizontal: 'center' };
      worksheet.getCell('A1').font = { bold: true, size: 10 };
    
      worksheet.mergeCells('A2:D2'); // Unir celdas
      worksheet.getCell('A2').value = 'DIRECCIÓN DE ADMINISTRACIÓN';
      // worksheet.getCell('A2').alignment = { horizontal: 'center' };
      worksheet.getCell('A2').font = { bold: true, size: 10 };
    
      worksheet.mergeCells('A3:D3'); // Unir celdas
    
      worksheet.getCell('A3').value = 'VERIFICACIÓN DEL AUTOMOTOR';
      // worksheet.getCell('A3').alignment = { horizontal: 'center' };
      worksheet.getCell('A3').font = { bold: true, size: 10 };
    
      worksheet.mergeCells('A4:E4'); // Unir celdas
      worksheet.getCell('A4').value = 'INFORME DE DEPÓSITOS';
      worksheet.getCell('A4').alignment = { horizontal: 'center' };
      worksheet.getCell('A4').font = { bold: true, size: 10 };
    
      worksheet.mergeCells('C1:E1'); // Unir celdas
      worksheet.getCell('C1').value = `Fecha de impresión: ${new Date().toLocaleDateString("es-AR")}`;
    
      worksheet.mergeCells('A6:G6'); // Unir celdas
      worksheet.getCell('A6').value = `Periodo desde ${new Date(this.buscarDepositosForm.value.Desde).toLocaleDateString("es-AR")} hasta ${new Date(this.buscarDepositosForm.value.Hasta).toLocaleDateString("es-AR")}`;
      // worksheet.getCell('A4').alignment = { horizontal: 'center' };
      worksheet.getCell('A6').font = { bold: true, size: 10 };
    
    
    
    
      // Encabezados personalizados en la fila 8
    worksheet.getRow(8).values = [
     'Fecha', 'Unidad', 'Tipo', 'Cuenta', 'Importe'
    ];
    
    // Establecer ancho de columnas manualmente
    worksheet.getColumn(1).width = 20; // Fecha
    worksheet.getColumn(2).width = 20; // Unidad
    worksheet.getColumn(3).width = 25; // Tipo de Formulario
    worksheet.getColumn(4).width = 10; // Desde
    worksheet.getColumn(5).width = 10; // Cantidad
    
    // Inserción de datos comenzando en la fila 9
    this.depositos.forEach((data: any, index:number) => {
      const rowIndex = 9 + index; // Empieza en la fila 9
      worksheet.getRow(rowIndex).values = [
        data.fecha,
        data.unidad,
        data.tipo,
        data.cuenta,
        '$' + data.importe
      ];
    });
    
    
          // Agregar los datos
       //   worksheet.insertRows(9, transformedData);
      
          // Crear archivo Excel
          workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, 'Entregas.xlsx');
          });
    
    
        // listaEntregas viene con un NroEntrega y 
      }
    

}
