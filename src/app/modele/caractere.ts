export class Caractere {
    francais: string='';
    japonaisKata: string='';
    japonaisHira: string='';
    kanji: string='';
    francaisCorrect:boolean=false;
    japonaisKataCorrect: boolean=false;
    japonaisHiraCorrect: boolean=false;
    kanjiCorrect: boolean=false;
    constructor(
        francais: string,
        japonaisKata: string,
        japonaisHira: string,
        kanji: string
    ) 
    { 
        this.francais = francais;
        this.japonaisHira = japonaisHira;
        this.japonaisKata= japonaisKata;
        this.kanji= kanji;
    }

    comparer(caractere: Caractere): Caractere {
        console.log(this, caractere);
        
        if (this.francais.toUpperCase() === caractere.francais.toUpperCase()) {
            console.log(`Français : ${this.francais} ≠ ${caractere.francais}`);
            this.francaisCorrect = true;
        }
        if (this.japonaisKata.toUpperCase() === caractere.japonaisKata.toUpperCase()) {
            this.japonaisKataCorrect = true;
        }
        if (this.japonaisHira.toLowerCase() === caractere.japonaisHira.toLowerCase()) {
            this.japonaisHiraCorrect =true;
        }
        if (this.kanji.toLowerCase() === caractere.kanji.toLowerCase()) {
            this.kanjiCorrect = true;
        }
        return caractere
    } 
    reset(){
        this.francais=''
        this.japonaisKata='';
        this.japonaisHira='';
        this.kanji='';
        this.francaisCorrect=false;
        this.japonaisKataCorrect = false;
        this.japonaisHiraCorrect =false;
        this.kanjiCorrect = false;

        return this;
    }
}