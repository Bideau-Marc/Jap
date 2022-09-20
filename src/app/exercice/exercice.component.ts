import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {
  standard: boolean = true;
  expression:string = "";
  drag:boolean = false;
  firstTry:boolean =false;
  correct:boolean=false;
  liste:{"fr":any,"ans":any}[]= [];
  answer:string="";
  score:number=0;
  nbessaies:number = 1;
  premier:boolean=false;
  un:boolean=false;
  premierExo:boolean= false;
  secondExo:boolean=true;
  listeFr: string[]=[];
  listeJap: string[]=[]
  constructor() { }

  ngOnInit(): void {
    let nbListe:number
    let nbdanslaliste:number;
    console.log(localStorage.getItem("exo"))
    switch(localStorage.getItem('exo')){
      case "formules":
        this.liste  = [
        {"fr": "oui", "ans": "はい"},
        {"fr": "non", "ans": "いいえ"},
        {"fr": "svp", "ans": "おねがいします"},
        {"fr": "merci", "ans": "ありがとう"},
        {"fr": "merci poli", "ans": "ありがとうございます"},
        {"fr": "merci beaucoup", "ans": "ありがとうございます"},
        {"fr": "de rien", "ans": "どういたしまして"},
        {"fr": "bonjour", "ans": "こんにちは"},
        {"fr": "bonjour du matin (poli)", "ans": "おはよう(ございます)"},
        {"fr": "bonsoir", "ans": "こんばんは"},
        {"fr": "comment ça va", "ans": "おｹﾞﾝｷですか"},
        {"fr": "ça va", "ans": "はい，げんきです"},
        {"fr": "au revoir", "ans": "またん"},
        {"fr": "au revoir (adieu)", "ans": "さよなら"},
        {"fr": "bonne nuit", "ans": "おやすみ"},
        {"fr": "a demain", "ans": "またあした"},
        {"fr": "enchanté", "ans": "はじめまして"},
        {"fr": "je vous en prie (entrez)", "ans": "どおぞ"},
        {"fr": "bon app", "ans": "いただきます"},
        {"fr": "désolé", "ans": "ごめん"},
        {"fr": "excusez-moi", "ans": "すみません"},
        {"fr": "bon travail", "ans": "おつかねさまでした"},
        {"fr": "j'y vais", "ans": "いってきます"},
        {"fr": "bonne journée", "ans": "いってらっしゃい"},
        {"fr": "je suis rentré", "ans": "ただいま"},
        {"fr": "bon retour(poli)", "ans": "おかえり(なさい)"},
        {"fr": "bienvenu (magasin)", "ans": "いらっしゃいませ"},
        {"fr": "bienvenu", "ans": "ようこそ"},
        {"fr": "je rentre (chez quelqu'un)", "ans": "おｼﾞｬﾏします"}
        ]
        nbListe = Math.floor(Math.random() * this.liste.length)
        nbdanslaliste = Math.floor(Math.random() * 2)
        console.log(nbListe, "nblsites",nbdanslaliste,"nbdanslaliste");
        if(nbdanslaliste == 0){
          this.expression = this.liste[nbListe].fr;
          this.answer = this.liste[nbListe].ans
        }
        else{
          this.expression = this.liste[nbListe].ans;
          this.answer = this.liste[nbListe].fr;

        }
        console.log(this.expression)
        break;
      case "katakana":

        break;
      case "hiragana":

        break;
      case "premier kanji":

        break;
      case "mobilier":

        break;
      default:
        break;
            
    }
    // let i:number = Math.random();
    // console.log(i,"i")
    // if(i<0.5){
    //   this.standard=true;
    // }
    // else{
    //   this.drag = true;
    // }
    
    this.liste.slice(0,8).forEach(element=>{
      this.listeFr.push(element.fr);
      this.listeJap.push(element.ans);
    })
    console.log("listeFr", this.listeFr, this.shuffleArray(this.listeFr))
  }
verifier(){
  switch(true){
    case this.premierExo:
      let ans = (<HTMLInputElement>document.getElementById('ans')).value
      this.answer = this.answer.toUpperCase()
      console.log(ans, "ans", this.answer, this.answer.includes(ans.toUpperCase()), this.answer.toLocaleUpperCase())
      if(this.answer.includes(ans.toUpperCase())){
        console.log('bien ouej')
        this.firstTry = true;
        this.correct= true;
        if(!this.premier){
          this.score++;
        }
      }
      else{
        console.log('mal ouej')
        this.firstTry = true;
        this.premier = true;
      }
      break;
    case this.secondExo:
      console.log('verif');
      let listeVerif:{"fr":any,"ans":any}[]= [];

      for(let i = 0; i<this.listeFr.length;i++){
        listeVerif.push({"fr":this.listeFr[i],"ans":this.listeJap[i]})
      }
      if(this.liste.includes(listeVerif))
  }
 
}
afficher(){
  this.correct = true;
}
next(){
  this.un = true;
  (<HTMLInputElement>document.getElementById('ans')).value = ""
  let nbListe:number
  let nbdanslaliste:number;
  nbListe = Math.floor(Math.random() * this.liste.length)
  nbdanslaliste = Math.floor(Math.random() * 2)
  console.log(nbListe, "nblsites",nbdanslaliste,"nbdanslaliste");
  if(nbdanslaliste == 0){
    this.expression = this.liste[nbListe].fr;
    this.answer = this.liste[nbListe].ans
  }
  else{
    this.expression = this.liste[nbListe].ans;
    this.answer = this.liste[nbListe].fr;

  }
  this.correct = false;
  this.firstTry = false;  
  this.premier=false;
  this.nbessaies++;
}
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.listeFr, event.previousIndex, event.currentIndex);
}
dropListe2(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.listeJap, event.previousIndex, event.currentIndex);
}
 shuffleArray(array:string[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
}

