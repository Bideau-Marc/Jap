import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import  * as formules from '../listes/formules_de_politesse.json';
import  * as katakana from '../listes/katakana.json';
import  * as hiragana from '../listes/hiragana.json';


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
  nbessaies:number = 1;
  premier:boolean=false;
  un:boolean=false;
  premierExo:boolean= false;
  secondExo:boolean=true;
  listequestion: string[]=[];
  listeJap: string[]=[]
  listeDeVerif:{"question":any,"ans":any,"juste":any}[]= [];
  verified: boolean = false;
 
  constructor() { }

  ngOnInit(): void {
    let nbListe:number
    let nbdanslaliste:number;
    console.log(formules, "here", JSON.parse(JSON.stringify(formules)).length)
    switch(localStorage.getItem('exo')){
      case "formules":
        for(let i = 0; i<JSON.parse(JSON.stringify(formules)).length; i++){
          this.liste.push(JSON.parse(JSON.stringify(formules))[i]);
        }
        
        break;
      case "katakana":
        for(let i = 0; i<JSON.parse(JSON.stringify(katakana)).length; i++){
          this.liste.push(JSON.parse(JSON.stringify(katakana))[i]);
        }
        break;
      case "hiragana":
        for(let i = 0; i<JSON.parse(JSON.stringify(hiragana)).length; i++){
          this.liste.push(JSON.parse(JSON.stringify(hiragana))[i]);
        }
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
    nbListe = Math.floor(Math.random() * this.liste.length)
    nbdanslaliste = Math.floor(Math.random() * 2)
    console.log(nbListe, "nblsites",nbdanslaliste,"nbdanslaliste");
    if(nbdanslaliste == 0){
      this.expression = this.liste[nbListe].question;
      this.answer = this.liste[nbListe].ans
    }
    else{
      this.expression = this.liste[nbListe].ans;
      this.answer = this.liste[nbListe].question;

    }
    console.log("aqui", this.liste, typeof this.listeDeVerif.slice(0,2) )
     let int = Math.floor(Math.random() * this.liste.length-8);
     this.liste.slice(int,int+8).forEach(element=>{
      this.listequestion.push(element.question);
      this.listeJap.push(element.ans);
    })
    console.log("listequestion", this.listequestion, this.shuffleArray(this.listequestion),)
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
      console.log(this.listeDeVerif,"listeDeVerif")
      this.verified = true;
      this.correct = true;
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
    this.expression = this.liste[nbListe].question;
    this.answer = this.liste[nbListe].ans
  }
  else{
    this.expression = this.liste[nbListe].ans;
    this.answer = this.liste[nbListe].question;

  }
  this.correct = false;
  this.firstTry = false;  
  this.premier=false;
  this.nbessaies++;
}
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.listequestion, event.previousIndex, event.currentIndex);
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

