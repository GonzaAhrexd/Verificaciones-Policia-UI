import { Component } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarUsuarioComponent } from '../../components/agregar-usuario/agregar-usuario.component';
import { EditarUsuariosComponent } from '../../components/administrar-usuarios/administrar-usuarios.component';
@Component({
  selector: 'app-administrar-usuarios',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, AgregarUsuarioComponent, EditarUsuariosComponent],
  templateUrl: './administrar-usuarios.component.html',

})
export class AdministrarUsuariosComponent {

  constructor(private userService: UserService, private router: Router) {}

  opcionesDatos = [
    { texto: "Nuevo usuario" },
    { texto: "Administrar usuarios" },
  ]

  opcion = ""
  
  getClickedSection(text: any) {
    this.opcion = text
  }
  
  ngOnInit() { 
    let isAuth = this.userService.isAuthenticated();
    if(!isAuth){
      this.router.navigate(['/login']);
      }else{
        if(this.userService.getUser().rol != "Administrador"){
          this.router.navigate(['/']);
        }
        
    }
  }
}
