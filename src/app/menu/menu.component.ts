import { Component,OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ConnectHttpComponent } from '../connect-http/connect-http.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit{
  constructor(public authServ : AuthService) { }
  ngOnInit() {}
 }