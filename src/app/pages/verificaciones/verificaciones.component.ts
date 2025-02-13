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
  
  constructor (private userService: UserService, private router: Router) {}

  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar verificación"},

  ]
  
  opcion:string = ""

  getClickedSection(text: any) {
    this.opcion = text
  }


  ngOnInit() { 
    let isAuth = this.userService.isAuthenticated();
    if(!isAuth){
      this.router.navigate(['/login']);
      }else{
        
    }
  }
  
}
