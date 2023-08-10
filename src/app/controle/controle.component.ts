import { Component, OnInit } from '@angular/core';
import { ControleService } from '../API/service/services/controle/controle-service.service';
import { Controle } from '../modele/Controle';
import { ExerciceService } from '../API/service/services/exercice/exercice.service';
import { Router } from '@angular/router';
import { Reponses } from '../modele/Reponse';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {
  controle!: Controle;
  afficher: boolean = false;
  saved: boolean = false;
  errorRec: boolean = false;
  errorRecMessage: string = "un problème est survenue lors de l'enregistrement veuillez rééessayer plus tard avec un autre contrôle"
  constructor(private router: Router, private controleService: ControleService, private exerciceService: ExerciceService) { }

  ngOnInit(): void {
    this.controleService.controleARefaire$.subscribe(controle => {
      if (controle) {
        this.controle = controle;
        this.controle.exercicesReponses.forEach(exo=>{
          let repTemp:Reponses= {
            francais:"",
            hiragana:"",
            kanji:"",
            katakana:"",
          }
          exo.reponse = repTemp;
        })
      }
      else {
        this.controleService.generateControle().then((controle: Controle) => {
          this.controle = controle;
          console.log(this.controle)
        })
      }
      console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");



    });

  }
  verifierControle() {
    this.afficher = true;
    let score: number = 0;
    this.controle.exercicesReponses.forEach(exo => {
      if (this.exerciceService.verifierReponse(exo.exercice, exo.reponse, true, exo.type)) {
        score++;
      }
      else {
        console.log(exo);

      }
    })
    console.log(score, this.controle);
    this.controle.note = score;
  }
  recControle() {
    console.log(this.controle);

    if (this.controleService.saveControle(this.controle).subscribe()) {
      console.log("saved",);

      this.saved=true;
    }
    else {
      this.errorRec = true;
    }
  }
  setUpControle() {
    this.afficher = false;
    this.errorRec = false;
    this.saved = false;
    this.controleService.generateControle().then((controle: Controle) => {
      this.controle = controle;
    })
  }
}

