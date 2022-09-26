import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import  * as formules from '../listes/formules_de_politesse.json';
import  * as katakana from '../listes/katakana.json';
import  * as hiragana from '../listes/hiragana.json';
import  * as premierKanji from '../listes/premier_Kanji.json';
import * as mobilier from '../listes/materiel_domestique.json';
import { elementAt } from 'rxjs';
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
  liste:{"question":any,"ans":any}[]= [];
  answer:string="";
  score:number=0;
  nbessaies:number = 0;
  premier:boolean=false;
  aficher:boolean= false;
  un:boolean=false;
  premierExo:boolean = false;
  secondExo:boolean = true;
  TypeExo:boolean[]=[false,false];
  listequestion: string[]=[];
  listeJap: string[]=[]
  listeDeVerif:{"question":any,"ans":any,"juste":any}[]= [];
  verified: boolean = false;
 
  constructor() { }

  ngOnInit(): void {
    this.getTypeExo();
   
    switch(localStorage.getItem('exo')){
      case "formules":
        console
       this.setListe(formules);
        
        break;
      case "katakana":
        this.setListe(katakana);
        break;
      case "hiragana":
        this.setListe(hiragana);
        break;
      case "premier kanji":
        this.setListe(premierKanji);
        break;
      case "mobilier":
        this.setListe(mobilier);
        break;
      default:
        break;
            
    }
    this.shuffleArray(this.liste)
    this.getQuestion();
    
    this.setListeFRetJap();
    this.shuffleArray(this.listeJap)
    this.shuffleArray(this.listequestion)
  }
verifier(){
  console.log(this.TypeExo, "ans") //(<HTMLInputElement>document.getElementById('ans')).value)
  switch(true){
    case this.TypeExo[0]:
      let ans = (<HTMLInputElement>document.getElementById('ans')).value
      this.answer = this.answer.toUpperCase()
      if(this.answer.includes(ans.toUpperCase()) && this.answer !=""){
        this.correct= true;
        ans = ""
        if(!this.premier){
          this.score++;
        }
      }
      else{
        this.firstTry = true;
        this.premier = true;
      }
      break;
    case this.TypeExo[1]:
      let listeVerif:{"question":any,"ans":any}[]= [];
      for(let i = 0; i<this.listequestion.length;i++){
        listeVerif.push({"question":this.listequestion[i],"ans":this.listeJap[i]})
      }
      listeVerif.forEach(element=>{
         if(this.liste.filter(a=> a.question ==element.question && a.ans ==element.ans).length!=0){
          this.listeDeVerif.push({"question":element.question,"ans":element.ans,"juste":"juste"})
         }
         else
           this.listeDeVerif.push({"question":element.question,"ans":element.ans,"juste":"faux"})
      });
      this.verified = true;
      this.correct = true; 
      this.listeDeVerif.forEach(element=>{
        if(element.juste==="juste"){
          this.score++;
        }
        this.nbessaies++;
      });
      break;
    default:
      break;

  }
 
}
afficher(){
  this.aficher = true;
  this.firstTry = false;
}
next(){
  this.TypeExo = [false,false]

  this.getTypeExo();
  this.shuffleArray(this.liste)
  this.getQuestion();
  this.listeJap=[]
  this.listequestion = []
  this.listeDeVerif = []
  this.setListeFRetJap();
  this.shuffleArray(this.listeJap)
  this.shuffleArray(this.listequestion)
  this.correct = false;
  this.firstTry = false;  
  this.premier=false;
  this.nbessaies++;
  this.aficher = false;
  this.verified = false;
}
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.listequestion, event.previousIndex, event.currentIndex);
}
dropListe2(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.listeJap, event.previousIndex, event.currentIndex);
}
 shuffleArray(array:any) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
  setListe(file: { question: string; ans: string; }[]){
    for(let i = 0; i<JSON.parse(JSON.stringify(file)).length; i++){
      this.liste.push(JSON.parse(JSON.stringify(file))[i]);
    }
  }
  getTypeExo(){
    let nbexo = Math.floor(Math.random() * this.TypeExo.length);
    for(let p = 0; p<this.TypeExo.length;p++){
      if(p == nbexo){
        this.TypeExo[p]=true;
      }
    }
    console.log(this.TypeExo)
  }
  getQuestion(){
    let nbListe:number
    let nbdanslaliste:number;
    nbListe = Math.floor(Math.random() * this.liste.length)
    nbdanslaliste = Math.floor(Math.random() * 2)
    if(nbdanslaliste == 0){
      this.expression = this.liste[nbListe].question;
      this.answer = this.liste[nbListe].ans;
    }
    else{
      this.expression = this.liste[nbListe].ans;
      this.answer = this.liste[nbListe].question;

    }
  }
  setListeFRetJap(){
    let int = Math.floor(Math.random() * this.liste.length-8);
    console.log(int, int+8)
     this.liste.slice(int,int+8).forEach(element=>{
      this.listequestion.push(element.question);
      this.listeJap.push(element.ans);
    })
  }
}

