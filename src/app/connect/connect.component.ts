import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Compte } from '../model/compte.model';
import {MatButtonModule} from '@angular/material/button';
import {  FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
@Component({
  standalone: true,
  imports:[ CommonModule ,ReactiveFormsModule,MatButtonModule,FormsModule,MatFormFieldModule,MatInputModule,MatIconModule],
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  user: Compte = new Compte();
  signin: FormGroup;

  constructor(private authServ: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.signin = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }
hide=true;
erreur=false;
  connected() {
  
    this.user.email = this.signin.get('email')?.value;
    this.user.password = this.signin.get('password')?.value;

    let permission: boolean = this.authServ.connect(this.user);
    console.log("Tentative de connexion :" + this.user.email);

    if (permission) {
      console.log("oui");
      this.router.navigate(['/etudiants']);
    } else {
      console.log("non");
      this.erreur = true;
    }
  }

  reset() {
    this.erreur = false;
    this.signin.reset(); // Reset the form controls
  }
}
