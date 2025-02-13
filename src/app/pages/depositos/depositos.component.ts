import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardActionsComponent } from '../../components/card-actions/card-actions.component';
import { AgregarDepositoComponent } from '../../components/agregar-deposito/agregar-deposito.component';
import { BuscarDepositoComponent } from '../../components/buscar-deposito/buscar-deposito.component';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
@Component({
  selector: 'app-depositos',
  standalone: true,
  imports: [SidebarComponent, CardActionsComponent, AgregarDepositoComponent, BuscarDepositoComponent ],
  templateUrl: './depositos.component.html',
})

export class DepositosComponent {
  
  constructor(private userService: UserService, private router: Router) {}
    
  opcionesDatos = [
    { texto: "Búsqueda" },
    { texto: "Agregar depósito"},
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
        
    }
  }
  



}
