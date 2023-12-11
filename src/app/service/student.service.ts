import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';
import * as pdfjsLib from 'pdfjs-dist';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  tab_etu : Etudiant[];
  tab_grp : Groupe[];
  constructor() {
  this.tab_etu = [
    { id:111546351, nom:"Dridi", prenom:"Nawel", dateNaiss:new Date("09/27/2002"),moy:12.5, "absenceCount":0,
    "isEliminated":true, grp:{ id:3, nomGrp:"DSI23", parcours:"Développement des Systèmes d'Information"}},
     { id:222, nom:"Ben Hamda", prenom:"Sami", dateNaiss:new Date("11/04/2002"),moy :10,      "absenceCount":0,
     "isEliminated":true,grp:{ id:5, nomGrp:"SEM21", parcours:"Systèmes Embarqués et Mobiles"}},
    { id:333, nom:"Zaier", prenom:"Manel", dateNaiss:new Date("02/15/2001"),     "absenceCount":0,
    "isEliminated":true, grp:{ id:1, nomGrp:"DSI21", parcours:"Développement des Systèmes d'Information"}},
 { id:444, nom:"Fourati", prenom:"Iyed", dateNaiss:new Date("06/24/2001"), moy:9.88,     "absenceCount":0,
 "isEliminated":true,grp:{ id:4, nomGrp:"RSI21", parcours:"Réseaux et Systèmes Informatiques"}}
 ]
 this.tab_grp = [
 { id:1, nomGrp:"DSI21", parcours:"Développement des Systèmes d'Information"},
 { id:2, nomGrp:"DSI22", parcours:"Développement des Systèmes d'Information"},
 { id:3, nomGrp:"DSI23", parcours:"Développement des Systèmes d'Information"},
 { id:4, nomGrp:"RSI21", parcours:"Réseaux et Systèmes Informatiques"},
 { id:5, nomGrp:"SEM21", parcours:"Systèmes Embarqués et Mobiles"}
 ]
 }
listStudents(){
  return this.tab_etu;
}
addStudent(etudiant: Etudiant){
  this.tab_etu.push(etudiant);
  console.log(`Student added: ${etudiant.nom}`);
}
delStudent(e: Etudiant){
  const pos = this.tab_etu.indexOf(e);

    
    if (pos !== -1) {
      
      this.tab_etu.splice(pos, 1);
      console.log(`Student with CIN ${e.id} deleted successfully.`);
    } else {
      console.log(`Student with CIN ${e.id} not found.`);
    }

}
viewStudent (num : number) : Etudiant {
  return this.tab_etu.find(e => e.id==num)!
  }
editStudent(updatedStudent: Etudiant): void {
    const existingStudent = this.tab_etu.find((e) => e.id === updatedStudent.id);

    if (existingStudent) {
      this.delStudent(existingStudent); 
      this.addStudent(updatedStudent); 
    }
}
listGroups(){
  return this.tab_grp;
}

getGroupById(groupId: number): Groupe | undefined {
  return this.tab_grp.find((group) => group.id === groupId);
}
viewGroup (num : number) : Groupe {
  return this.tab_grp.find(e => e.id==num)!
  }
  getGroups(): Groupe[] {

    return this.tab_grp;
  }
  getNbStudents(): number {
    return this.tab_etu.length; // Assurez-vous que "tab_etu" est accessible ici
  }

  getNbGroups(): number {
    return this.tab_grp.length; // Assurez-vous que "tab_grp" est accessible ici
  }

  getAvgMoyennes(): number {
    let total=0;
    this.tab_etu.forEach(Etudiant => {
      total += Etudiant.moy??0;
    });
    const nbEtudiants =this.tab_etu.length;
    if(nbEtudiants>0){
      return total/nbEtudiants;
    }
    else{return 0;}
  }
 }

