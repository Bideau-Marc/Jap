import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ParseTreeResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import  * as formules from '../listes/formules_de_politesse.json';
import  * as katakana from '../listes/katakana.json';
import  * as hiragana from '../listes/hiragana.json';
import  * as premierKanji from '../listes/premier_Kanji.json';
import * as mobilier from '../listes/materiel_domestique.json';
import { elementAt } from 'rxjs';
import { CaractereService } from '../API/service/services/caractere/caractere.service';
import { FormControl, FormGroup, MinLengthValidator } from '@angular/forms';
import { Exercice } from '../modele/Exercice';
import { Caractere } from '../modele/Caractere';
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {
  exo!: Exercice;
  fr:boolean=true;// bool define if display input for answer in french 
  kata:boolean= true;// bool define if display input for answer in Katakana
  hira: boolean= true;// bool define if display input for answer in hiragana
  kanji: boolean = true;;// bool define if display input for answer in kanji
  expression:string = "";  //value to display in the question
  // drag:boolean = false;
  correct:boolean=false; // if true the answer is/are correct 
  liste:Caractere[]= [];
  answer!:Caractere
  answerUser!:Caractere;
  listeInput: any[] = [];


  answerCorrect:boolean[]=[false,false,false,false]
  score:Score={
    scoreUser:0,
    totalScore:0
  }
  nbessaies:number = 0;
  premier:boolean=false;
  afficher:boolean= false;
  // premierExo:boolean = false;
  // secondExo:boolean = true;
  // TypeExo:boolean[]=[false,false];//liste du type d'exo dispo 
  // listequestion: string[]=[];
  // listeJap: string[]=[]
  // listeDeVerif:{"francais":any,"japonais":any,"juste":any}[]= [];
  verified: boolean = false;
  constructor(private service:CaractereService) { }

  ngOnInit(): void {
    this.answer = new Caractere('','','','')
    this.answerUser = new Caractere('','','','')
    this.setExo();
 
    
  }

  async setExo(){
    let a = localStorage.getItem('exo')
    
    if(a!=null){
      console.log(a,'a');

      this.setListe(await this.service.getCaractereByTheme(parseInt(a)))
      
      
    }
    this.next()
  }
verifier(){

  this.listeInput=[    document.getElementById('fra'),        document.getElementById('kata'), document.getElementById('hira'),   document.getElementById('kan')]
  console.log(
    this.listeInput
  );
  console.log(this.answer, this.answerUser);
  this.exo.equals()
  console.log(this.exo.note);
  console.log(this.exo.caractereReponse);
  
  console.log(this.listeInput);
  
  if(this.exo.caractereReponse.francaisCorrect &&this.listeInput[0]!=null){
    console.log('inside correctFr',this.listeInput[0]);
    
    this.listeInput[0].classList.add('is-valid')
    
    if(this.listeInput[0].classList.contains('is-invalid')){
      console.log("infis");
      
      this.listeInput[0].classList.remove('is-invalid')
      
    }
    
    console.log('inside correctFr2',this.listeInput[0]);
  }
  else if(this.listeInput[0]!=null){
    console.log("inesle");
    
     this.listeInput[0].classList.add('is-invalid')
   }

  if(this.exo.caractereReponse.japonaisKataCorrect&&this.listeInput[1]!=null){
    this.listeInput[1].classList.add('is-valid')
    if(this.listeInput[1].classList.contains('is-invalid'))this.listeInput[1].classList.remove('is-invalid')

 
  }
  else if(this.listeInput[1]!=null){
    this.listeInput[1].classList.add('is-invalid')
  }
  if(this.exo.caractereReponse.japonaisHiraCorrect&&this.listeInput[2]!=null){
    this.listeInput[2].classList.add('is-valid')
    if(this.listeInput[2].classList.contains('is-invalid'))this.listeInput[2].classList.remove('is-invalid')
    
  }
  else if(this.listeInput[2]!=null){
    this.listeInput[2].classList.add('is-invalid')
  }
  if(this.exo.caractereReponse.kanjiCorrect&&this.listeInput[3]!=null){
    this.listeInput[3].classList.add('is-valid')
    if(this.listeInput[3].classList.contains('is-invalid'))this.listeInput[3].classList.remove('is-invalid')
    
  }
  else if(this.listeInput[3]!=null){
    this.listeInput[3].classList.add('is-invalid')
  }
  
  
  if(this.exo.caractereReponse.francaisCorrect&&this.exo.caractereReponse.japonaisKataCorrect&&this.exo.caractereReponse.japonaisHiraCorrect&&this.exo.caractereReponse.kanjiCorrect){
    this.correct=true;
    console.log(this.premier);
    
    if(!this.premier){
      this.score.scoreUser += this.exo.note;
      this.score.totalScore++;

    }

  }
  else{
    this.premier=true;
    this.score.totalScore++;
  }

 
}
display(){
  this.afficher = true;
}
next(){
  console.log(this.exo);
  
  this.expression='';
  this.listeInput.forEach(element=>{
    if(element!=null){
      element.classList.remove('is-valid')
      element.classList.remove('is-invalid')
    }
    
  })
  // this.TypeExo = [false,false]
  this.answerCorrect=[false,false,false,false]
  console.log(this.answer);
  
  this.answer.reset();
  if(this.exo!=undefined){
    this.exo.caractere.reset();
    this.exo.caractereReponse.reset();
  }
  this.fr = true;
  this.hira = true;
  this.kata = true;
  this.kanji = true;
  // this.getTypeExo();
  this.shuffleArray(this.liste)
  this.getQuestion();
  // this.listeJap=[]
  // this.listequestion = []
  // this.listeDeVerif = []
  // this.setListeFRetJap();
  // this.shuffleArray(this.listeJap)
  // this.shuffleArray(this.listequestion)
  this.correct = false;
  this.premier=false;
  this.nbessaies++;
  this.afficher = false;
  this.verified = false;
}
// drop(event: CdkDragDrop<string[]>) {
//   moveItemInArray(this.listequestion, event.previousIndex, event.currentIndex);
// }
// dropListe2(event: CdkDragDrop<string[]>) {
//   moveItemInArray(this.listeJap, event.previousIndex, event.currentIndex);
// }
 shuffleArray(array:any) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
setListe(file: any){
    console.log("debut", file[0]);
    console.log(file);
    
    file.forEach((element:any) => {
      let caractere = new Caractere(element.francais,element.japonaisHira, element.japonaisKata,element.kanji )
        this.liste.push(caractere)
    });
    console.log("fin de setListe", this.liste, this.liste.length);
    
  }
  /***
   * A voir plus tard quand j'aurai bien finaliser les bases 
   */
  // getTypeExo(){
  //   let nbexo = Math.floor(Math.random() * this.TypeExo.length);
  //   for(let p = 0; p<this.TypeExo.length;p++){
  //     if(p == nbexo){
  //       this.TypeExo[p]=true;
  //     }
  //   }
  // }
  getQuestion(){
    let nbListe:number
    let nbdanslaliste:number;
    nbListe = Math.floor(Math.random() * this.liste.length)//choisi un rang dans la liste 
    nbdanslaliste = Math.floor(Math.random() * 4)// choisi fr ou jap 
    this.exo = new Exercice(this.liste[nbListe])
    this.expression =this.exo.question;
    console.log(this.exo);
    switch(this.exo.typeOfQuestion){
              case "francais":
                this.exo.caractereReponse.francais = this.exo.question
                this.fr = false;
                break;
              case "hiragana":
                this.exo.caractereReponse.japonaisHira = this.exo.question
                this.hira = false;
                break;
              case "katakana":
                this.exo.caractereReponse.japonaisKata = this.exo.question;
                this.kata = false;
                break;
              case "kanji":
                this.exo.caractereReponse.kanji = this.exo.question
                this.kanji = false;
                break;
              default:
                break;
     }


  
     this.answer = this.exo.caractere
     console.log(this.answer);
    
    // switch(true){
    //   case nbdanslaliste==0 &&  this.liste[nbListe].francais!='':
    //     this.expression = this.liste[nbListe].francais;//setup question
    //     this.answerUser.francais= this.liste[nbListe].francais;
    //     this.answer= this.liste[nbListe]//setup answer
    //     break;
    //   case nbdanslaliste==1 && this.liste[nbListe].japonaisHira!='':
    //     this.expression = this.liste[nbListe].japonaisHira;//setup question
    //     this.answerUser.japonaisHira= this.liste[nbListe].japonaisHira;
    //     this.answer= this.liste[nbListe]//setup answer
    //     break; 
    //   case nbdanslaliste==2 && this.liste[nbListe].japonaisKata!='':
    //     this.expression = this.liste[nbListe].japonaisKata;//setup question
    //     this.answerUser.japonaisKata= this.liste[nbListe].japonaisKata;
    //     this.answer= this.liste[nbListe]//setup answer
    //     break;
    //   case nbdanslaliste==3 && this.liste[nbListe].kanji!='':
    //     this.expression = this.liste[nbListe].kanji;//setup question
    //     this.answerUser.kanji= this.liste[nbListe].kanji;
    //     this.answer= this.liste[nbListe]//setup answer

    //     break;
    // }


  }
  
  // setListeFRetJap(){
  //   let int = Math.floor(Math.random() * (this.liste.length-8));
  //   console.log(int, int+8, this.liste.length)
  //    this.liste.slice(int,int+8).forEach(element=>{
  //     this.listequestion.push(element.francais);
  //     this.listeJap.push(element.japonais);
  //   })
  // }
}
export interface Score{
  scoreUser:number;
  totalScore:number
}
