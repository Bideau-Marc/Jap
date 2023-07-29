import { Caractere } from '../modele/Caractere';

export class Exercice{
    note:number =0;
    question: string='';
    typeOfQuestion: string ='';
    caractere!:Caractere;
    caractereReponse!:Caractere;
    reponse:{type:string; question:string}[]=[]
    constructor( caractere:Caractere){
      this.caractereReponse = new Caractere('','','','');
      this.caractere = caractere;
        let array = [caractere.francais,caractere.japonaisHira,caractere.japonaisKata,caractere.kanji];
        let arraKey = ['francais',"hiragana","katakana","kanji"];
        let randCara = Math.floor(Math.random() * 4);
        while(array[randCara]===''){
          randCara = Math.floor(Math.random() * 4);
        }
        this.question= array[randCara];
        this.typeOfQuestion = arraKey[randCara];
        // let i=0;
        // for(let index =0; index<arraKey.length; index++){
        //     console.log('inside loop',index, randCara, index!=randCara);
            
        //     if(index!=randCara){
        //         console.log("inside if");
                
        //         this.reponse[i]= {type:arraKey[i], question:array[i]};
        //     }
        //     i++;

        // }
        console.log(this.reponse, "here", randCara, this.question, this.reponse);
        }
    
        equals(){
          console.log(this.caractere, this.caractereReponse);
          
          this.caractereReponse.comparer(this.caractere)
          console.log(this.caractere.comparer(this.caractereReponse));
            if(this.caractereReponse.francaisCorrect&& this.caractereReponse.japonaisKataCorrect&& this.caractereReponse.kanjiCorrect && this.caractereReponse.japonaisHiraCorrect){
              this.note++;
            }
            
            
        }
}