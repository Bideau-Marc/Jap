import { Caractere } from '../modele/Caractere';

export class Exercice_Controle{
    note:number =0;
    question: string='';
    caractere!:Caractere
    reponse:string='';
    typeResponse:string='';
    constructor( caractere:Caractere){
      this.caractere = caractere
        let array = [caractere.francais,caractere.japonaisHira,caractere.japonaisKata,caractere.kanji]
        let arraKey = ['francais',"hiragana","katakana","kanji"]
        let randCara = Math.floor(Math.random() * 4)
        while(array[randCara]===''){
          randCara = Math.floor(Math.random() * 4)
        }
        this.question= array[randCara];
        let randCaraAns = Math.floor(Math.random() * 4)
        while(array[randCaraAns]==='' && randCara!=randCaraAns){
          randCaraAns = Math.floor(Math.random() * 4)
        }
        this.reponse= array[randCaraAns];
        this.typeResponse = arraKey[randCaraAns]
        console.log(this.reponse);
        
    }
    
    equals(answer: string){
    console.log(answer, this.reponse, answer.toUpperCase()===this.reponse.toUpperCase());
      if(answer.toUpperCase()===this.reponse.toUpperCase()){
        this.note++;
      } 
    }
}