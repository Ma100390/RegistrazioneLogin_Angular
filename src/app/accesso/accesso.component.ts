import { Component,} from '@angular/core';
import { AuthService } from '../auth.service'; // Importa il servizio per l'autenticazione
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accesso',
  templateUrl: './accesso.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule],
  styleUrls: ['./accesso.component.css']
})
export class AccessoComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    // Chiamata al metodo di autenticazione del servizio
    this.authService.login(this.email, this.password)
      .subscribe(
        () => {
          console.log('sei entrato nel paggina')
          this.router.navigate(['/documenti']);
        },
        error => {
          // Gestisci gli errori di autenticazione
          this.errorMessage = error.message;
        }
      );
  }
}
