import { Caractere } from "./caractere";

export class Exercice{
    note:number =0;
    question: string='';
    caractere: Caractere={
      francais:'',
      japonaisHira:'',
      japonaisKata:'',
      kanji:''
    };
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
    //     let fr, kata,hira,kan;
    // if(this.caractere.francais.toUpperCase()===cara.francais.toUpperCase()){
    //   console.log("fr",this.caractere.francais,cara.francais,this.caractere.francais===cara.francais);
    //     fr= true;
    // }
    // else{
    //     fr=false;
    // }
    // if(this.caractere.japonaisHira===cara.japonaisHira){
    //   hira=true;
    //   console.log("hira",this.caractere.japonaisHira,cara.japonaisHira,this.caractere.japonaisHira===cara.japonaisHira);
    // } 
    // else hira=false;
    // if(this.caractere.japonaisKata===cara.japonaisKata){
    //   kata=true;
    //   console.log("kata",this.caractere.japonaisKata,cara.japonaisKata,this.caractere.japonaisKata===cara.japonaisKata);
      
    // }
    // else kata=false;
    // if(this.caractere.kanji===cara.kanji){
    //   kan=true;
    //   console.log("kanji",this.caractere.kanji,cara.kanji,this.caractere.kanji===cara.kanji);
    // }
    // else kan = false;
    // if(fr&&kata&&hira&&kan) this.note++;
    // return [fr,kata,hira,kan];
    console.log(answer, this.reponse, answer.toUpperCase()===this.reponse.toUpperCase());
    
      if(answer.toUpperCase()===this.reponse.toUpperCase()){
        this.note++;
      }
  
    }
}