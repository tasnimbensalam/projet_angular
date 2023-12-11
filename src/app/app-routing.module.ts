import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import{UpdateEtudiantComponent} from './update-etudiant/update-etudiant.component';
import { SearchEtudiantComponent } from './search-etudiant/search-etudiant.component';
import {ConnectComponent} from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConnectHttpComponent } from './connect-http/connect-http.component';
const routes: Routes = [
  {path: "etudiants", component : EtudiantsComponent},
  {path: "add-etudiant", component : AddEtudiantComponent},
  {path: "connect", component: ConnectHttpComponent},


  { path: '', redirectTo: '/connect', pathMatch: 'full' },
  
  {path: "updateEtudiant/:num", component : UpdateEtudiantComponent},
  { path: 'search-etudiant', component: SearchEtudiantComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
