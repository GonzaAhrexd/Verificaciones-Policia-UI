// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarVerificacionComponent } from '../../components/agregar-verificacion/agregar-verificacion.component';
import { BuscarVerificacionesComponent } from '../../components/buscar-verificaciones/buscar-verificaciones.component';

// Autenticación
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-verificaciones',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, AgregarVerificacionComponent, BuscarVerificacionesComponent],
  templateUrl: './verificaciones.component.html',
})
export class VerificacionesComponent {
  
  // Inicialización de los servicios
  constructor (private userService: UserService, private router: Router) {}
  
  
  // Variables
  opcion:string = ""
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar verificación"},
  ]
  

  // Inicialización
  ngOnInit() { 
    let isAuth = this.userService.isAuthenticated(); // Verifica si el usuario está autenticado
    if(!isAuth){ // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
      }else{
        
    }
  }

  // Funciones
  getClickedSection(text: any) { // Función para obtener la opción seleccionada
    this.opcion = text
  }

  
}
