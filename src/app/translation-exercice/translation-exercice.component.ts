import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ExerciceService } from '../API/service/services/exercice/exercice.service';
import { ScoreService } from '../API/service/services/score/score.service';
import { Exercice } from '../modele/Exercice';
import { Reponses } from '../modele/Reponse';

@Component({
  selector: 'app-translation-exercice',
  templateUrl: './translation-exercice.component.html',
  styleUrls: ['./translation-exercice.component.css']
})
export class TranslationExerciceComponent implements OnInit {
  @Output() nextExerciceClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() exercice!: Exercice;
  @Input() reponse!: Reponses;
  @Input() afficherSolution: boolean = false;

  showResult: boolean = false;
  isCorrect!: boolean;
  
  resultat: string = '';
  isFirstAttempt: boolean = true;

  ngOnInit(): void {
  }

  constructor(private exerciceService: ExerciceService, public scoreService: ScoreService) { }


  nextExercice() {
    // reset toutes les valeurs pour passer a l'exercice suivant 
    this.resetExo();
    // Émettre l'événement pour indiquer que le bouton "Next" a été cliqué
    this.nextExerciceClicked.emit();
  }

  verifierReponse() {
    this.isCorrect= this.exerciceService.verifierReponseTranslation(this.isFirstAttempt, this.exercice, this.reponse)
    if (this.isCorrect) {
      // L'utilisateur a réussi
      this.resultat = 'Bravo, vos réponses sont correctes !';
      if (this.isFirstAttempt) {
        // Si c'est le premier coup réussi, on incrémente le score
        this.scoreService.incrementScore();
      }
      this.isFirstAttempt = false; // Indiquer que l'utilisateur a réussi au moins une fois
    } else {
      this.resultat = 'Désolé, vos réponses ne sont pas correctes. Réessayez !';
      this.isFirstAttempt = false; // Indiquer que l'utilisateur a échoué au premier coup
    }

    return this.isCorrect
  }
  // Ajoutez cette méthode pour réinitialiser les valeurs des inputs et du résultat
  resetExo() {
    console.log('called');
    this.afficherSolution=false;
    this.isCorrect = false ;
    this.reponse.francais = '';
    this.reponse.kanji = '';
    this.reponse.hiragana = '';
    this.reponse.katakana = '';
    this.resultat = '';
    this.isFirstAttempt=true;
  }

 
}
