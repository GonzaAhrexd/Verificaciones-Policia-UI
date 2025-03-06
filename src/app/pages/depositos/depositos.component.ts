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
    { texto: "Búsqueda", SVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 ` },
    { texto: "Agregar depósito", SVG: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 `},
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
