import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditarCamposComponent } from './pages/editar-campos/editar-campos.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'editar-campos', component: EditarCamposComponent },
];
