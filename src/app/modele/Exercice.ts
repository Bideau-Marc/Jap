import { QuestionType } from "./QuestionType";
import { Reponses } from "./Reponse";

export interface Exercice {
  id: number;
  question: string;
  questionType: QuestionType
  answers: Reponses; // Tableau de réponses possibles
}