import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  // templateUrl: './app.component.html',
  template: `
  <!DOCTYPE html>
    <html lang="en">
      <style lang="css">
::-webkit-scrollbar {
    width: 8px; /* Ajusta el ancho del scrollbar */
  }

  /* Personaliza el track (la "pista" por donde se mueve el thumb) */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color de fondo del track */
    border-radius: 10px; /* Bordes redondeados */
  }

  /* Personaliza el thumb (la "barra" que se mueve) */
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Color de la barra */
    border-radius: 10px; /* Bordes redondeados */
    border: 2px solid transparent; /* Espacio alrededor de la barra */
  }

  /* Cambia el color del thumb cuando está en hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color más oscuro en hover */
  }
        </style>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body [ngClass]="{'flex flex-col lg:ml-[15rem]': !isLoginPage}">
  <router-outlet /> 
  </body>
</html>
  `,
})
export class AppComponent {
  // Variables
  title = 'FondoUnicoUI';
  isLoginPage = false;

  constructor(private router: Router) {
    // Escucha los cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Si la ruta es 'login', no agregues la clase 'flex flex-col lg:ml-[15rem]'
      this.isLoginPage = this.router.url.includes('login');
    });
  }

}
