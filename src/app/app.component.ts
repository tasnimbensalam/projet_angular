import { Component } from '@angular/core';
import { UserModel } from './model/user.model';
import { UsersService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet';
  users: UserModel[] = [];
  constructor( userService:UsersService ) {
   userService.getUsers().subscribe((response: any[]) =>
     {
     this.users = response.map(item => 
     {
     return new UserModel(item.id,item.email ); 
     });
     });
     } 
}


