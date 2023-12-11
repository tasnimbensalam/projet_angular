
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/user.service';
import { UserModel } from '../model/user.model';

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
  standalone:true,
  imports:[CommonModule ,ReactiveFormsModule,MatButtonModule,FormsModule,MatFormFieldModule,MatInputModule,MatIconModule],
 selector: 'app-connect-http',
 templateUrl: './connect-http.component.html',
 styleUrls: ['./connect-http.component.css']
})
export class ConnectHttpComponent implements OnInit {
 users!: UserModel[]
 user = new Compte();
 hide=true;
 
 erreur = false;
 userCourant! : string;
 isConnected : boolean = false;
 

 constructor(private userServ: UsersService, private router: 
  Router) { }
   
   getUsers(): void {
   this.userServ.getUsers().subscribe(items => this.users = 
  items);
   }
   disconnect() {
   this.isConnected = false;
   this.userCourant = undefined!;
   this.router.navigate(['/']);
   }
   connect(user : Compte) : boolean {
   this.users.forEach((unUser) => {
   if(user.email == unUser.email && user.password ==
  unUser.username) {
   this.userCourant = unUser.name!;
   this.isConnected = true;
   }
   });
   return this.isConnected;
   }
   setUserCourant(u : string) {
   this.userCourant = u;
   this.isConnected = true;
   }
   connected(){
   let permission: boolean = this.connect(this.user); 
   console.log("Tentative de connexion :" + this.user.email);
   if (permission)
   this.router.navigate(['/dashboard']);

   else
 this.erreur=true;
 }
 reset() {
 this.erreur=false;
 }
 ngOnInit() {
 this.getUsers();
 }
}