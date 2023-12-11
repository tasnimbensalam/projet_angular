import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/tab_etu`).pipe(
      catchError((error) => {
        console.error('Error fetching students:', error);
        return throwError(error);
      })
    );
  }
  updateabs(etudiant: Etudiant): Observable<any> {
    const url = `${this.apiUrl}/etudiants/${etudiant.id}`;
    const updatedEtudiant = { absenceCount: etudiant.absenceCount };
  
    return this.http.put(url, updatedEtudiant).pipe(
      catchError((error) => {
        console.error('Error updating absence count:', error);
        throw error; // Rethrow the error for further handling in the component
      })
    );
  }
  
  getGrp(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tab_grp`).pipe(
      catchError((error) => {
        console.error('Error fetching groups:', error);
        return throwError(error);
      })
    );
  }
  viewStudent(id: number): Observable<Etudiant | undefined> {
    return this.http.get<Etudiant>(`${this.apiUrl}/tab_etu/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching student:', error);
        return throwError(error);
      })
    );
  }
  addStudent(student: Etudiant): Observable<Etudiant> {
    // Assuming you want to send the entire student object in the request body
    return this.http.post<Etudiant>(`${this.apiUrl}/tab_etu`, student).pipe(
      catchError((error) => {
        console.error('Error adding student:', error);
        return throwError(error);
      })
    );
  }

  updateStudent(student: Etudiant): Observable<void> {
    const url = `${this.apiUrl}/tab_etu/${student.id}`;
    return this.http.put<void>(url, student).pipe(
      catchError((error) => {
        console.error('Error updating student:', error);
        return throwError(error);
      })
    );
  }
  viewGroup(id: number): Observable<Groupe | undefined> {
    return this.http.get<Groupe>(`${this.apiUrl}/tab_grp/${id}`);
  }
  delStudent(cin: number): Observable<void> {
    console.log('Deleting student with cin:', cin);
    return this.http.delete<void>(`${this.apiUrl}/tab_etu/${cin}`).pipe(
      catchError((error) => {
        console.error('Error deleting student:', error);
        return throwError(error);
      })
    );
  }
}
