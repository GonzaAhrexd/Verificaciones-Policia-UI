import { Component } from '@angular/core';
// Componentes
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HomeButtonsComponent } from '../../components/home-buttons/home-buttons.component';
import { getLoggedUser } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import {  Router } from '@angular/router';

type Opcion = { 
   texto: string, ruta: string 
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ SidebarComponent, HomeButtonsComponent],
  templateUrl: './home.component.html',
})

export class HomeComponent {
  // Instancia del servicio UserService
  constructor(private userService: UserService, private router: Router) {}

  usuario = "Usuario"

  Opciones: Opcion[] = [
    {texto:"Entregas", ruta:"/entregas" },
    {texto:"Depósitos", ruta:"/depositos" },
    {texto:"Verificaciones", ruta:"/verificaciones" }
  ]

  ngOnInit() { 
      let isAuth = this.userService.isAuthenticated();
      if(!isAuth){
        this.router.navigate(['/login']);
        }else{
          
        this.usuario = this.userService.getUser().nombre + " " + this.userService.getUser().apellido;
      }
  }


}
