import { Injectable } from '@angular/core';
import { CaractereService } from '../caractere/caractere.service';
import { Caractere } from 'src/app/modele/Caractere';
import { Exercice } from 'src/app/modele/Exercice';
import { QuestionType } from 'src/app/modele/QuestionType';
import { Reponses } from 'src/app/modele/Reponse';
import { ExerciseType } from 'src/app/modele/ExerciceType';
import { Observable, from } from 'rxjs';
import { ScoreService } from '../score/score.service';


@Injectable({
  providedIn: 'root'
})
export class ExerciceService {
  // ...
  constructor(private caractereService: CaractereService, private scoreService:ScoreService) { }

  // Méthode pour obtenir un caractère aléatoire parmi les différentes formes disponibles
  private getRandomCaractere(theme:number): Promise<Caractere> {
    return new Promise<Caractere>((resolve, reject) => {
      this.caractereService.getCaractereByTheme(theme).subscribe((data: Caractere[]) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomCaractere = data[randomIndex];
        resolve(randomCaractere);
      }, (error) => {
        reject(error);
      });
    });
  }

  generateTraductionExercice(theme:number): Promise<Exercice> {
    return new Promise<Exercice>(async (resolve, reject) => {
      try {
        const randomCaractere = await this.getRandomCaractere(theme);
        const questionTypes: QuestionType[] = ['francais', 'kanji', 'hiragana', 'katakana'];
        const randomIndex = Math.floor(Math.random() * questionTypes.length);
        const questionType: QuestionType = questionTypes[randomIndex];

        // Construire la question en fonction du type choisi
        let question = '';
        switch (questionType) {
          case 'francais':
            question = randomCaractere.francais;
            break;
          case 'kanji':
            question = randomCaractere.kanji;
            break;
          case 'hiragana':
            question = randomCaractere.japonaisHira;
            break;
          case 'katakana':
            question = randomCaractere.japonaisKata;
            break;
        }

        // Vérifier si la question est vide et rappeler la fonction si nécessaire
        if (question === '') {
          return this.generateTraductionExercice(theme)
            .then((exercice) => resolve(exercice))
            .catch((error) => reject(error));
        }

        // Construire les réponses en fonction du type choisi
        console.log('dans le service', questionType, questionType==='francais')
        const answers: Reponses = {
          francais: questionType !== 'francais' ? randomCaractere.francais : '',
          kanji: questionType !== 'kanji' ? randomCaractere.kanji : '',
          hiragana: questionType !== 'hiragana' ? randomCaractere.japonaisHira : '',
          katakana: questionType !== 'katakana' ? randomCaractere.japonaisKata : '',
        };
        console.log('dans le service toujours', answers)
        const exercice: Exercice = {
          id: randomCaractere.id,
          question,
          questionType: questionType,
          answers: answers,

        };

        resolve(exercice);
      } catch (error) {
        reject(error);
      }
    });
  }
  generateRandomExerciseType(): ExerciseType {
    const exerciseTypes: ExerciseType[] = ['translation', /*'matching-words', Ajoutez d'autres types d'exercices ici */];
  
    const randomIndex = Math.floor(Math.random() * exerciseTypes.length);
    return exerciseTypes[randomIndex];
  }
  
   
  generateExo(theme:number): Observable<{exo:Exercice, type:ExerciseType}> {
    let exerciseType = this.generateRandomExerciseType();
    
    return new Observable<{exo:Exercice, type:ExerciseType}>((observer) => {
      switch (exerciseType) {
        case 'translation':
          this.generateTraductionExercice(theme)
          .then((exercice) => {
            observer.next({ exo:exercice, type:exerciseType });
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
          break;
        case 'matching-words':
          // Générer l'exercice pour le type 'matching-words'
          // Vous pouvez implémenter la logique pour ce type d'exercice ici
          break;
        // Ajoutez d'autres cas pour les autres types d'exercices
        default:
          // Générer l'exercice par défaut ou afficher un message d'erreur
          break;
      }
    });
  }
   verifierReponse(exerice:Exercice, userAnswers:Reponses, isFirstAttempt:boolean, typeExercice:ExerciseType):boolean{
    switch (typeExercice) {
      case 'translation':
       return this.verifierReponseTranslation(isFirstAttempt, exerice, userAnswers)
      case 'matching-words':
        // Générer l'exercice pour le type 'matching-words'
        // Vous pouvez implémenter la logique pour ce type d'exercice ici
        break;
      // Ajoutez d'autres cas pour les autres types d'exercices
      default:
        // Générer l'exercice par défaut ou afficher un message d'erreur
        return false;
    }
    return false;
  }
  verifierReponseTranslation(isFirstAttempt:boolean, exercice:Exercice, userAnswers:Reponses, ) {
    let isCorrect:boolean=false;
    if (isFirstAttempt) {
      // Si c'est le premier coup réussi, on incrémente le score
      this.scoreService.incrementAttempts();
    }
    // Vérifier les réponses de l'utilisateur et gérer le score
    const reponsesCorrectes = {
      francais: exercice.answers.francais,
      kanji: exercice.answers.kanji,
      hiragana: exercice.answers.hiragana,
      katakana: exercice.answers.katakana
    };

    // Définir les propriétés à une chaîne vide ('') si elles sont undefined
    reponsesCorrectes.francais = reponsesCorrectes.francais || '';
    reponsesCorrectes.kanji = reponsesCorrectes.kanji || '';
    reponsesCorrectes.hiragana = reponsesCorrectes.hiragana || '';
    reponsesCorrectes.katakana = reponsesCorrectes.katakana || '';
    userAnswers.francais = userAnswers.francais || '';
    userAnswers.kanji = userAnswers.kanji || '';
    userAnswers.hiragana = userAnswers.hiragana || '';
    userAnswers.katakana = userAnswers.katakana || '';

    // Calculer la similarité normalisée pour chaque réponse
    const similarityFrancais = this.calculateSimilarity(userAnswers.francais, reponsesCorrectes.francais);
    const similarityKanji = this.calculateSimilarity(userAnswers.kanji, reponsesCorrectes.kanji);
    const similarityHiragana = this.calculateSimilarity(userAnswers.hiragana, reponsesCorrectes.hiragana);
    const similarityKatakana = this.calculateSimilarity(userAnswers.katakana, reponsesCorrectes.katakana);
    console.log(userAnswers, reponsesCorrectes, similarityFrancais,similarityHiragana,similarityKanji,similarityKatakana);

    // Vérifier si la réponse est correcte en fonction de la similarité (ici, j'utilise un seuil de 0.6, mais vous pouvez ajuster selon vos besoins)
    const isFrancaisCorrect = similarityFrancais >= 0.6;
    const isKanjiCorrect = similarityKanji >= 0.6;
    const isHiraganaCorrect = similarityHiragana >= 0.6;
    const isKatakanaCorrect = similarityKatakana >= 0.6;

    // Vérifier si toutes les réponses sont correctes
    isCorrect = isFrancaisCorrect && isKanjiCorrect && isHiraganaCorrect && isKatakanaCorrect;

    return isCorrect;
  }
 // Méthode pour calculer la distance de Levenshtein entre deux chaînes de caractères
 levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // Si l'une des chaînes est vide, retourner la longueur de l'autre chaîne
  if (m === 0 && n===0) return 0;

  // Tableau pour stocker les distances
  const dp: number[][] = [];

  // Initialisation du tableau
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Remplissage du tableau
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Suppression
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Remplacement
      );
    }
  }

  return dp[m][n];
}

// Méthode pour calculer la similarité normalisée entre deux chaînes de caractères
calculateSimilarity(s1: string, s2: string): number {
  const distance = this.levenshteinDistance(s1, s2);
  console.log(distance,"distance", s1, s2);
  
  const maxLength = Math.max(s1.length, s2.length);
  console.log('maxLength', maxLength);
  if(maxLength===0)return 1;
  const similarity = 1 - distance / maxLength;
  return similarity;
}

}