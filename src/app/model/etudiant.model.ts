import {Groupe} from "./groupe.model";
export class Etudiant {
   id!: number;
    nom!: string;
    prenom!: string;
    dateNaiss!: Date;
    moy?: number;
    grp!:Groupe;
    absenceCount!:number;
    isEliminated !:boolean;
  }