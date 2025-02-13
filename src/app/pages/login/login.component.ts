import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { login } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorLogin = ""

  ngOnInit() {
    
    // Toma .isAuthenticated del servicio UserService y si es true redirecciona al home
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  loginForm: FormGroup = new FormGroup({
    Usuario: new FormControl('', [Validators.required]),
    Clave: new FormControl('', [Validators.required]),
  });

  async loginUser() {
    try {
      const res = await login(this.loginForm.value, this.userService);
   
      this.router.navigate(['/']);
   

    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        this.errorLogin = 'Usuario o contraseña incorrecto';
      } else {
        this.errorLogin = 'Error en el login';
      }
      console.error(err);
    }
  }

  
}
