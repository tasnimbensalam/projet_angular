import { Component,OnInit  } from '@angular/core';
import { AuthService } from '../service/auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { StudentService } from '../service/student.service';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  standalone:true,
  imports:[MatCardModule,   MatCardModule,
    MatButtonModule,
   MatInputModule , CommonModule,MatGridListModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  nbEtu: number = 0;
  nbGrp: number = 0;
  avgMoy: number = 0;
  nbUsers: number=0;
  constructor(private studentServ: StudentService,private authServ:AuthService) {
    this.nbEtu = studentServ.getNbStudents();
    this.nbGrp = studentServ.getNbGroups();
    this.avgMoy = studentServ.getAvgMoyennes();
    this.nbUsers = authServ.calculNbUsers();
  }

  ngOnInit(): void {
    
  }
}
