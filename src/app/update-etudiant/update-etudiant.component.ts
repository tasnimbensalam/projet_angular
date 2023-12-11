import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';
import { ActivatedRoute, Router } from '@angular/router'
import { DataService } from '../service/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,MatButtonModule
   
  ],
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  
})
export class UpdateEtudiantComponent implements OnInit {
  etudiantCourant: Etudiant = new Etudiant();
  groups: Groupe[] = [];
  idgrpModified: number = 0;
 
  constructor(
    private actRoute: ActivatedRoute,
    private rout: Router,
    private dataService: DataService
  ) {}

  modifEtudiant() {
    // Update the existing logic to handle form submission
    // You can call a service method to update the data in the JSON server
    this.dataService.updateStudent(this.etudiantCourant).subscribe(
      () => {
        console.log(
          "Succès de modification etudiant " +
            this.etudiantCourant.id + " - " +
            this.etudiantCourant.nom + " " +
            this.etudiantCourant.prenom + " - " +
            this.etudiantCourant.dateNaiss + " -" +
            this.etudiantCourant.moy
        );
        this.rout.navigate(['etudiants']);
      },
      error => {
        console.error('Error updating student:', error);
      }
    );
  }
  

 ngOnInit(): void {
  const studentId = this.actRoute.snapshot.params['num'];

  // Fetch data for the specific student from the JSON server
  this.dataService.viewStudent(studentId).subscribe(
    (student: Etudiant | undefined) => {
      if (student) {
        // Set etudiantCourant only when data is available
        this.etudiantCourant = student;

        // Assuming `grp` has an `id` property
        this.idgrpModified = this.etudiantCourant.grp?.id || 0;
      } else {
        console.error('Student not found.');
      }
    },
    (error) => {
      console.error('Error fetching student:', error);
    }
  );

  this.dataService.getGrp().subscribe(
    (groups: Groupe[]) => {
      this.groups = groups || [];
      console.log('Groups:', this.groups);
    },
    (error) => {
      console.error('Error fetching groups:', error);
    }
  );
}
}
