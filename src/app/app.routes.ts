import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditarCamposComponent } from './pages/editar-campos/editar-campos.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { DepositosComponent } from './pages/depositos/depositos.component';
import { VerificacionesComponent } from './pages/verificaciones/verificaciones.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'editar-campos', component: EditarCamposComponent },
    { path: 'entregas', component: EntregasComponent },
    { path: 'depositos', component: DepositosComponent },
    { path: 'verificaciones', component: VerificacionesComponent },
    { path: 'administrar-usuarios', component: AdministrarUsuariosComponent },
    // Por defecto envía a login
    { path: '**', redirectTo: 'login' }
];
