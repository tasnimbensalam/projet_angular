import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule} from './material/material.module';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import {AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { FormsModule } from '@angular/forms';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { SearchEtudiantComponent } from './search-etudiant/search-etudiant.component';
import { ConnectComponent } from './connect/connect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { ConnectHttpComponent } from './connect-http/connect-http.component';
import { FooterComponent } from './footer/footer.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    EtudiantsComponent,
    SearchEtudiantComponent,
   
  
   
   
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([]),
    FormsModule,
    AddEtudiantComponent,
    FooterComponent,
    UpdateEtudiantComponent,
    ConnectComponent, DashboardComponent,HttpClientModule,  ConnectHttpComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
