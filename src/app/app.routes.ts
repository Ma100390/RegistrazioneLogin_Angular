import { RouterModule, Routes } from '@angular/router';
import { AccessoComponent } from './accesso/accesso.component';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { NgModule } from '@angular/core';
import { DocumentiComponent } from './documenti/documenti.component';

export const routes: Routes = [
  { path: 'accesso', component: AccessoComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'documenti', component: DocumentiComponent }, // Sposta questa route prima della route generica
  { path: '', redirectTo: '/accesso', pathMatch: 'full' }, // Redirect alla pagina di accesso come pagina predefinita
  { path: '**', redirectTo: '/accesso' }, // Questa route deve essere l'ultima
];

  @NgModule({

    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }