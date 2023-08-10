import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import { Controle } from 'src/app/modele/Controle';
import { User } from 'src/app/modele/User';
import { ThemeService } from '../theme/theme.service';
import { Theme } from '../../../../modele/Theme';
import { Exercice } from 'src/app/modele/Exercice';
import { CaractereService } from '../caractere/caractere.service';
import { ExerciseType } from 'src/app/modele/ExerciceType';
import { ExerciceService } from '../exercice/exercice.service';
import { Reponses } from 'src/app/modele/Reponse';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  url: string = 'http://localhost:3000/controle'

  constructor(private http: HttpClient, private themeService: ThemeService, private caractereService: CaractereService, private exerciceService: ExerciceService, private userService: LoginService) { }

  saveControle(controle: Controle): Observable<boolean> {
    console.log("saving", controle.note, this.url);
    let bool =  this.http.post(this.url+"/", controle).pipe(
        map(() => true),
        catchError(error => {
          console.error("An error occurred:", error);
          return of(false);
        })
      );
    
    console.log(bool);
    
    return bool ;
  }
  getControleByUser(user: User): Observable<Controle[]> {
    return this.http.get<Controle[]>(this.url + '/byIdUser/' + user.id)
  }
  async generateControle(): Promise<Controle> {
    let type: ExerciseType;
    let themes: Theme[] = []; // Initialiser avec un tableau vide
    const fetchedThemes = await this.themeService.getRandomThemes(4).toPromise();
    if (fetchedThemes) {
      themes = fetchedThemes;
    }
    console.log(themes);

    const exercises: Exercice[] = [];
    console.log(themes);

    // Récupérer les caractères associés à chaque thème et créer les exercices correspondants
    for (const theme of themes) {
      let a;
      do {
        a = await this.exerciceService.generateExo(theme.id).toPromise();

        if (a !== undefined) {
          const exercise: Exercice = a.exo;
          exercises.push(exercise);
          type = a.type;
        }
      } while (a === undefined);

    }
    console.log(exercises, "exos");
    const exerciceReposnes: { exercice: Exercice; reponse: Reponses; type: ExerciseType }[] = []
    exercises.forEach(ex => {
      let reponse: Reponses = {
        francais: "",
        kanji: "",
        hiragana: "",
        katakana: "",
      };

      exerciceReposnes.push({ exercice: ex, reponse: reponse, type: type })
    })
    let date= new Date();
    const controle: Controle = {
      id: 1,
      exercicesReponses: exerciceReposnes,
      note: 0,
      date:date,
      personneId: this.userService.getUserId()
    };
    console.log(controle.exercicesReponses[0].reponse)
    return controle;
  }

  // Méthode pour récupérer les caractères associés à un thème
  // private getCharactersForTheme(theme: Theme): string[] {
  //   // Implémentez la logique pour récupérer les caractères associés au thème à partir de votre base de données ou de votre service de thèmes
  //   // Ici, nous supposerons simplement que le service de thèmes a une méthode "getCharactersForTheme" qui renvoie une liste de caractères associés à un thème donné.
  //   return this.themeService.getCharactersForTheme(theme);
  // }

  // // Méthode pour générer un exercice pour un type donné et une liste de caractères donnée
  // private generateExercise(exerciseType: ExerciceType, characters: string[]): Exercice {
  //   // Implémentez la logique pour générer un exercice en fonction du type d'exercice et des caractères donnés
  //   // Ici, nous supposerons simplement que nous retournons un exercice avec une question et des réponses vides.
  //   // Vous devrez ajuster cette logique pour générer des exercices appropriés en fonction du type d'exercice que vous avez défini.
  //   const exercise: Exercice = {
  //     question: '',
  //     answers: {
  //       francais: '',
  //       kanji: '',
  //       hiragana: '',
  //       katakana: ''
  //     }
  //   };

  //   return exercise;
  // }

  // // Méthode pour obtenir un type d'exercice aléatoire
  // private getRandomExerciseType(): ExerciceType {
  //   // Implémentez la logique pour obtenir un type d'exercice aléatoire parmi les types que vous avez définis
  //   // Ici, nous supposerons simplement que nous retournons "translation" pour cet exemple.
  //   // Vous devrez ajuster cette logique pour obtenir un type d'exercice réellement aléatoire.
  //   return 'translation';
  // }
  private controleARefaireSubject = new BehaviorSubject<Controle | null>(null);
  controleARefaire$ = this.controleARefaireSubject.asObservable();

  transmettreControleARefaire(controle: Controle) {
    this.controleARefaireSubject.next(controle);
  }
}
