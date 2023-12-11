import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {Etudiant} from '../model/etudiant.model';
import {Groupe} from '../model/groupe.model';
import { FormsModule } from '@angular/forms';
import {StudentService} from '../service/student.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MaterialModule} from '../material/material.module';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-add-etudiant',
  standalone: true,
  imports: [CommonModule,FormsModule,  MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MaterialModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule 
  ],
  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.css'
})
export class AddEtudiantComponent implements OnInit {
  newEtu: Etudiant = new Etudiant();
  newGrp: Groupe = new Groupe();
  groups: Groupe[] = [];

  newCin: number = 0;

  constructor(private studentServ: DataService, private rout: Router) {}

  ajouterEtudiant() {
    this.studentServ.getGrp().subscribe((groups) => {
      if (groups && groups.length > 0) {
        // Assuming you have logic to determine the correct group ID based on the retrieved list of groups
        const groupId =groups[0].id;
        
        this.studentServ.viewGroup(groupId).subscribe((group) => {
          if (group) {
            this.newGrp = group;
            this.studentServ.addStudent(this.newEtu).subscribe(
              (addedStudent) => {
                console.log('Student added successfully:', addedStudent);
                this.rout.navigate(['etudiants']);
              },
              (error) => {
                console.error('Error adding student:', error);
              }
            );
          } else {
            console.error('Group not found');
          }
        });
      } else {
        console.error('No groups found');
      }
    });
  }
  ngOnInit() {
   
    this.newEtu = new Etudiant();
    this.newGrp = new Groupe();
    this.studentServ.getGrp().subscribe(
      (groups) => {
        this.groups = groups || [];
      },
      (error) => {
        console.error('Error fetching groups', error);
      }
    );
  }
}