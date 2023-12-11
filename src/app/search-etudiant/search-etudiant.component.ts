// search-etudiant.component.ts

import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model'; 
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-search-etudiant',
  templateUrl: './search-etudiant.component.html',
  styleUrls: ['./search-etudiant.component.css']
})
export class SearchEtudiantComponent implements OnInit {
  list_etu: Etudiant[] = [];
  nomEtu: string = '';
  list_grp: Groupe[] = [];
  grpidRech: number = 0;
  critere: string = 'nom';
  redoubleStyle ={'color':'red'};

  constructor(private studentServ: StudentService) { }

  ngOnInit() {
    this.list_grp = this.studentServ.listGroups();
  }

  chercherParNom(name: string) {
    // Reset the list_etu to the initial list of students
    this.list_etu = this.studentServ.listStudents();

    // Convert the input name and student names to lowercase for case-insensitive comparison
    const lowerCaseName = name.toLowerCase();

    // Filter the list_etu based on the lowercase input name
    this.list_etu = this.list_etu.filter(e => e.nom.toLowerCase().includes(lowerCaseName));
  }

  chercherParGrp() {
    // Reset the list_etu to the initial list of students
    this.list_etu = this.studentServ.listStudents();

    // Filter the list_etu based on the selected group id
    if (this.grpidRech !== 0) {
      this.list_etu = this.list_etu.filter(e => e.grp.id === this.grpidRech);
    }
  }


  lesserThan(value: number | undefined): boolean {
    // Check if the value is defined and greater than 10
    return value !== undefined && value < 10;
  }
}
