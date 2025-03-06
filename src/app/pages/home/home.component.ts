// Librerías de Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// Servicio de usuario
import { UserService } from '../../api/user.service';
// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HomeButtonsComponent } from '../../components/home-buttons/home-buttons.component';

// Tipos
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
  // Variables
  usuario = "Usuario"
  usuarioRol = ""
  
  OpcionesFondo: Opcion[] = [
    { texto: "Entregas", ruta: "/entregas" },
  ]

  OpcionesPlanta: Opcion[] = [
    { texto: "Depósitos", ruta: "/depositos" },
    { texto: "Verificaciones", ruta: "/verificaciones" }
  ]

  // Inicialización de la página
  ngOnInit() {
    let isAuth = this.userService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (!isAuth) { // Si no está autenticado, redirige al login
      this.router.navigate(['/login']); // Redirige al login
    } else { // Si está autenticado
      this.usuarioRol = this.userService.getUser().rol; // Obtiene el rol del usuario
      this.usuario = this.userService.getUser().nombre + " " + this.userService.getUser().apellido; // Obtiene el nombre y apellido del usuario
    }
  }


}