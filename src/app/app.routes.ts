import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditarCamposComponent } from './pages/editar-campos/editar-campos.component';
import { EntregasComponent } from './pages/entregas/entregas.component';
import { DepositosComponent } from './pages/depositos/depositos.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'editar-campos', component: EditarCamposComponent },
    { path: 'entregas', component: EntregasComponent },
    { path: 'depositos', component: DepositosComponent }

];
