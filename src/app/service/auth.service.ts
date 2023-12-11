import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: Compte[] = [
    { email: 'tasnime@gmail.com', password: '123', nom: 'Your Name', role: 'AGENT' },
    { email: 'admin@gmail.com', password: 'azerty', nom: 'Administrateur', role: 'ADMIN' }
  ];

  userCourant: string = '';
  roleCourant: string = '';
  isConnected: boolean = false;

  constructor(private router: Router) { }

  connect(user: Compte): boolean {
    this.users.forEach((unUser) => {
      if (unUser.email === user.email && unUser.password === user.password) {
        this.isConnected = true;
        this.userCourant = unUser.nom;
        this.roleCourant = unUser.role;
        console.log("Connexion de ", this.userCourant, " - role :", this.roleCourant);
        // Store userCourant in localStorage
        localStorage.setItem('userCourant', this.userCourant);
        // Store isConnected in localStorage
        localStorage.setItem('isConnected', 'true');
      }
    });
    return this.isConnected;
  }

  disconnect() {
    this.isConnected = false;
    this.userCourant = '';
    this.roleCourant = '';
    // Navigate to the login page
    this.router.navigate(['/connect']);
    // Remove userCourant from localStorage
    localStorage.removeItem('userCourant');
    // Remove isConnected from localStorage
    localStorage.removeItem('isConnected');
  }

  testerAdmin(): boolean {
    return this.roleCourant === 'ADMIN';
  }

  calculNbUsers(): number {
    return this.users.length;
  }
  isLoggedIn(): boolean {
    return this.isConnected;
  }
}

interface Compte {
  email: string;
  password: string;
  nom: string;
  role: string;
}
