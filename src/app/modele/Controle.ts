import { ControleService } from "../API/service/services/controle/controle-service.service";
import { Exercice } from "./Exercice";
import { ExerciseType } from "./ExerciceType";
import { Exercice_Controle } from "./Exercice_Controle";
import { Reponses } from "./Reponse";
import { User } from "./User";
export interface Controle {
    id: number;
    exercicesReponses: { exercice: Exercice; reponse: Reponses; type:ExerciseType }[]; // Tableau d'objets liant chaque Exercice à sa Reponse
    note: number;
    date:Date;
    personneId: number; // Identifiant de la personne associée au contrôle (si nécessaire)
    personne?:User
  }