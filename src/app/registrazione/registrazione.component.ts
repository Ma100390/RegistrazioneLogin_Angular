import { Component,inject } from '@angular/core';
import { AuthService } from '../auth.service'; // Importa il servizio per l'autenticazione
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentiComponent } from '../documenti/documenti.component';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,DocumentiComponent],
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  authService = inject(AuthService);
  
  constructor( private router: Router) { }

  register(): void {
    // Verifica se le password corrispondono
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Le password non corrispondono';
      return;
    }

    // Chiamata al metodo di registrazione del servizio
    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/documenti']);
        },
        error => {
          // Gestisci gli errori di registrazione
          this.errorMessage = error.message;
        }
      );
  }
}
