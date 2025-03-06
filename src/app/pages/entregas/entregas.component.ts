// Librerías de Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Router } from '@angular/router';
// Servicios
import { UserService } from '../../api/user.service';
// Componentes 
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarEntregaComponent } from '../../components/agregar-entrega/agregar-entrega.component';
import { BuscarEntregasComponent } from '../../components/buscar-entregas/buscar-entregas.component';


@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, CommonModule, AgregarEntregaComponent, BuscarEntregasComponent],
  templateUrl: './entregas.component.html',
})
export class EntregasComponent {
  // Inicialización del servicio de usuario y del router
  constructor(private userService: UserService, private router: Router) {}
  
  // Variables
  opcion:string = ""
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar entrega"},
  ]

  // Inicialización
  ngOnInit() { 
    let isAuth = this.userService.isAuthenticated();
    if(!isAuth){
      this.router.navigate(['/login']);
      
      }else{
      if(this.userService.getUser().rol !== "Fondo" && this.userService.getUser().rol !== "Administrador"  ){
        this.router.navigate(['/']);
      }
    }
}
  // Funciones
  getClickedSection(text: any) {
    this.opcion = text
  }

}
