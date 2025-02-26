import { Component } from '@angular/core';
// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HomeButtonsComponent } from '../../components/home-buttons/home-buttons.component';
import { getLoggedUser } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
type Opcion = {
  texto: string, ruta: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HomeButtonsComponent, CommonModule],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  // Instancia del servicio UserService
  constructor(private userService: UserService, private router: Router) { }

  usuario = "Usuario"
  usuarioRol = ""
  
  OpcionesFondo: Opcion[] = [
    { texto: "Entregas", ruta: "/entregas" },
  ]

  OpcionesPlanta: Opcion[] = [
    { texto: "Depósitos", ruta: "/depositos" },
    { texto: "Verificaciones", ruta: "/verificaciones" }
  ]

  ngOnInit() {
    let isAuth = this.userService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
    } else {
      this.usuarioRol = this.userService.getUser().rol;
      this.usuario = this.userService.getUser().nombre + " " + this.userService.getUser().apellido;
    }
  }


}
