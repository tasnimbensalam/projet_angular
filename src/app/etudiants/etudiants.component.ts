import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { DataService } from '../service/data.service';
import { jsPDF } from 'jspdf';

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  redoubleStyle = { 'color': 'red' };
  tab_etu: Etudiant[]=[];

  constructor(private dataServ: DataService) {}

  ngOnInit(): void {
    // Fetch students data when the component initializes
    this.refreshStudentList();
  }

  refreshStudentList(): void {
    this.dataServ.getStudents().subscribe(data => {this.tab_etu = data; });
  }
      
  incrementAbsence(etudiant: Etudiant): void {
    etudiant.absenceCount++;
    etudiant.isEliminated = etudiant.absenceCount > 3;

    this.dataServ.updateabs(etudiant).subscribe(
      (data) => {
        // Handle successful update
        console.log('Absence count updated successfully:', data);

        // Assuming you want to refresh the student list after updating the absence count
        this.refreshStudentList();
      },
      (error) => {
        // Handle error
        console.error('Error updating absence count:', error);
      }
    );}

  suppEtudiant(e: Etudiant): void {
    const rep = confirm("Etes-vous sûr de vouloir supprimer cet étudiant ?" + e.nom + e.prenom);
    if (rep) {
      
      this.dataServ.delStudent(e.id).subscribe(() => {
        console.log("Suppression avec succès :" + e.nom);
        // Refresh the student list after deletion
        this.refreshStudentList();
      });
    }
  }

  greaterThan(value: number | undefined): boolean {
    return value !== undefined && value >= 10;
  }

  lesserThan(value: number | undefined): boolean {
    return value !== undefined && value < 10;
  }
  generatePDF(): void {
    // Get the HTML element to be converted to PDF
    const element = document.getElementById('pdfContent');

    // Use html2canvas to capture the content as an image
    html2canvas(element as HTMLElement).then((canvas) => {
      // Convert the image to data URL
      const imgData = canvas.toDataURL('image/png');

      // Initialize jsPDF
      const pdf = new jsPDF();

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);

      // Save or download the PDF
      pdf.save('students_list.pdf');
    });
  }
}
