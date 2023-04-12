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
import { Caractere } from '../modele/caractere';
import { FormControl, FormGroup, MinLengthValidator } from '@angular/forms';
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent implements OnInit {

  expression:string = "";  //value to display in the question
  // drag:boolean = false;
  correct:boolean=false; // if true the answer is/are correct 
  liste:Caractere[]= [];
  answer:Caractere={
    francais: '',
    japonaisKata: '',
    japonaisHira: '',
    kanji: ''
  };
  answerUser:Caractere={
    francais: '',
    japonaisKata: '',
    japonaisHira: '',
    kanji: '',

  };
  listeInput: any[] = [];


  answerCorrect:boolean[]=[]
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
    this.setExo();
 
    
  }

  async setExo(){
    let a = localStorage.getItem('exo')
    if(a!=null){
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
  this.answerCorrect = this.service.equals(this.answer,this.answerUser)
  console.log(this.service.equals(this.answer, this.answerUser));
  
  // switch(true){
  //   case this.TypeExo[0]:
  // console.log(this.answer, this.answerUser, this.answerCorrect);
  // this.answerUser.forEach((element,index)=>{
  //   if(this.answer[index].includes(element.toUpperCase()) && element !=""){
  //     this.answerCorrect[index] =true
  //     element=''
  //   }
  // })
  // if(!this.premier&& this.answerCorrect[0]&& this.answerCorrect[1]&& this.answerCorrect[2]){
  //   this.score++;
  //   this.correct= true;
  // }
  // else{
  //   this.premier = true;
  // }
  let forms:HTMLCollectionOf<Element>= document.getElementsByClassName('form-control');
  this.answerCorrect.forEach((el,i)=>{
    if(this.listeInput[i]!=null){
      
      if(el){
        this.listeInput[i].classList.add('is-valid')
        if(this.listeInput[i].classList.contains('is-invalid'))this.listeInput[i].classList.remove('is-invalid')
      }
      else {
        this.listeInput[i].classList.add('is-invalid')
      }
    }
    
  })
  if(this.answerCorrect[0]&&this.answerCorrect[1]&&this.answerCorrect[2]&&this.answerCorrect[3]){
    this.correct=true;
    console.log(this.premier);
    
    if(!this.premier){
      this.score.scoreUser++;
      this.score.totalScore++;

    }

  }
  else{
    this.premier=true;
    this.score.totalScore++;
  }
  // this.answer.forEach(element=>{
  //   element = element.toUpperCase()
  //   if(element.includes(this.ans.toUpperCase()) && this.ans !=""){
    //   this.correct= true;
    //   this.ans = ""
    //   if(!this.premier){
    //     this.score++;
    //   }
    // }
    // else{
    //   this.premier = true;
    // }
  // })
  
  //     break;
  //   case this.TypeExo[1]:
  //     let listeVerif:{"francais":any,"japonais":any}[]= [];
  //     for(let i = 0; i<this.listequestion.length;i++){
  //       listeVerif.push({"francais":this.listequestion[i],"japonais":this.listeJap[i]})
  //     }
  //     listeVerif.forEach(element=>{
  //        if(this.liste.filter(a=> a.francais ==element.francais && a.japonais ==element.japonais).length!=0){
  //         this.listeDeVerif.push({"francais":element.francais,"japonais":element.japonais,"juste":"juste"})
  //        }
  //        else
  //          this.listeDeVerif.push({"francais":element.francais,"japonais":element.japonais,"juste":"faux"})
  //     });
  //     this.verified = true;
  //     this.correct = true; 
  //     this.listeDeVerif.forEach(element=>{
  //       if(element.juste==="juste"){
  //         this.score++;
  //       }
  //       this.nbessaies++;
  //     });
  //     break;
  //   default:
  //     break;

  // }
 
}
display(){
  this.afficher = true;
}
next(){
  this.expression='';
  this.listeInput.forEach(element=>{
    if(element!=null){
      element.classList.remove('is-valid')
      element.classList.remove('is-invalid')
    }
    
  })
  // this.TypeExo = [false,false]
  this.answerCorrect=[false,false,false]
  this.answer={
    francais: '',
    japonaisKata: '',
    japonaisHira: '',
    kanji: ''
  };
  this.answerUser={
    francais: '',
    japonaisKata: '',
    japonaisHira: '',
    kanji: ''
  }
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
    file.forEach((element:any) => {
        this.liste.push({francais:element.francais,japonaisHira:element.japonaisHira, japonaisKata:element.japonaisKata, kanji:element.kanji})
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
    
    switch(true){
      case nbdanslaliste==0 &&  this.liste[nbListe].francais!='':
        this.expression = this.liste[nbListe].francais;//setup question
        this.answerUser.francais= this.liste[nbListe].francais;
        this.answer= this.liste[nbListe]//setup answer
        break;
      case nbdanslaliste==1 && this.liste[nbListe].japonaisHira!='':
        this.expression = this.liste[nbListe].japonaisHira;//setup question
        this.answerUser.japonaisHira= this.liste[nbListe].japonaisHira;
        this.answer= this.liste[nbListe]//setup answer
        break; 
      case nbdanslaliste==2 && this.liste[nbListe].japonaisKata!='':
        this.expression = this.liste[nbListe].japonaisKata;//setup question
        this.answerUser.japonaisKata= this.liste[nbListe].japonaisKata;
        this.answer= this.liste[nbListe]//setup answer
        break;
      case nbdanslaliste==3 && this.liste[nbListe].kanji!='':
        this.expression = this.liste[nbListe].kanji;//setup question
        this.answerUser.kanji= this.liste[nbListe].kanji;
        this.answer= this.liste[nbListe]//setup answer

        break;
    }

    if(this.expression===''){
      this.getQuestion()
    }
    console.log(this.answer, this.liste[nbListe], nbListe, nbdanslaliste, this.expression);    

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
