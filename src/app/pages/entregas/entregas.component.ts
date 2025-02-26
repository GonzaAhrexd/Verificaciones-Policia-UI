import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { AgregarEntregaComponent } from '../../components/agregar-entrega/agregar-entrega.component';
import { BuscarEntregasComponent } from '../../components/buscar-entregas/buscar-entregas.component';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, CommonModule, AgregarEntregaComponent, BuscarEntregasComponent],
  templateUrl: './entregas.component.html',
})
export class EntregasComponent {

  constructor(private userService: UserService, private router: Router) {}
  

  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar entrega"},

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
      if(this.userService.getUser().rol !== "Fondo" && this.userService.getUser().rol !== "Administrador"  ){
        this.router.navigate(['/']);
      }
    }
}
}
