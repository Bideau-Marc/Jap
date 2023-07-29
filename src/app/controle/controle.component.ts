import { Component, OnInit } from '@angular/core';
import { Score } from '../exercice/exercice.component';
import { CaractereService } from '../API/service/services/caractere/caractere.service';
import { Theme } from '../modele/theme';
import { ThemeService } from '../API/service/services/theme/theme.service';
import { Exercice_Controle as Exercice } from '../modele/Exercice_Controle';
import { FormControl, FormGroup } from '@angular/forms';
import { Controle } from '../modele/Controle';
import { User } from '../modele/user';
import { ControleService } from '../API/service/services/controle/controle-service.service';
import { Caractere } from '../modele/Caractere';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent implements OnInit {
  controle=new FormGroup({
    exo0: new FormControl(''),
    exo1: new FormControl(''),
    exo2: new FormControl(''),
    exo3: new FormControl(''),
    exo4: new FormControl(''),
    exo5: new FormControl(''),
    exo6: new FormControl(''),
    exo7: new FormControl(''),
    exo8: new FormControl(''),
    exo9: new FormControl(''),
    exo10: new FormControl(''),
    exo11: new FormControl(''),
    exo12: new FormControl(''),
    exo13: new FormControl(''),
    exo14: new FormControl(''),
    exo15: new FormControl(''),
    exo16: new FormControl(''),
    exo17: new FormControl(''),
    exo18: new FormControl(''),
    exo19: new FormControl(''),
  });
  note: number=0;
  listeTheme:Theme[]=[];
  listeCaractereParTheme:Caractere[][]=[]
  exos:Exercice[]=[];
  // interval = setInterval(()=>{this.setExos(); console.log("interval");
  // },1000)
  constructor(private service:CaractereService, private theme:ThemeService , private controleService:ControleService) { }

  ngOnInit(): void {
        this.getAllTheme();
        console.log(
          this.service.getFourTheme([1,2,3,4])
        );        
        let user:User = JSON.parse(sessionStorage.getItem('user')!)
        
        this.controleService.getControle(user).then((r)=>{
          console.log(r,"he");
          
        })
  }

  getAllTheme(){
    this.theme.getAllTheme().subscribe((theme:Theme[])=> {
    this.listeTheme = theme; 
    this.setListeCaracterParTheme();
  });
    
  }
  async setListeCaracterParTheme(){
    
    for(let i =0; i< this.listeTheme.length; i++){
        await  this.listeCaractereParTheme.push(await this.service.getCaractereByTheme(this.listeTheme[i].id))
    }        
    
    this.setExos();
  }
  setExos(){
    // if(this.listeTheme.length<=this.listeCaractereParTheme.length){
    //   clearInterval(this.interval);
    for(let i=0; i<20; i++){
      let randTheme = Math.floor(Math.random() * this.listeTheme.length)
      let randCara = Math.floor(Math.random() * this.listeCaractereParTheme[randTheme].length)
      let caractere = new Caractere(this.listeCaractereParTheme[randTheme][randCara].francais, this.listeCaractereParTheme[randTheme][randCara].japonaisKata, this.listeCaractereParTheme[randTheme][randCara].japonaisHira, this.listeCaractereParTheme[randTheme][randCara].kanji)
      let exo: Exercice = new Exercice(caractere)
      this.exos.push(exo);
     
      
    }
  }



  
  onSubmit() {

    console.log(this.controle.value, this.controle.getRawValue());
    let array = this.controle.value
    let i:number = 0;
    let listeValue:string[]=[]

    let listeQuestion:string[]=[]
    for (const[key,value] of Object.entries(this.controle.value)){
      // console.log("question",this.exos[i].question, "response",value);
      if(value){
        listeValue.push(value);
      }  
       this.exos[i].equals(value!);
       console.log("la", typeof this.exos[i].question);
       listeQuestion.push(this.exos[i].question)
      i++;
      
    }
    this.getNote();
    let user : User = JSON.parse(sessionStorage.getItem('user')!)

    let controle:Controle = { listeExercice:JSON.stringify(listeQuestion),listeReponse: JSON.stringify(listeValue), note: this.note, personneId: user.id}
    console.log(
     this.controleService.saveControle(controle)
     );
  console.log("controle", JSON.stringify(controle));
  
  }
  getNote(){
    this.exos.forEach(element => {
      console.log(element);
      
      this.note+= element.note;
    });
    console.log(this.note
      );
    
  }
}



// // function subFetch(i:number):Promise<String> {
//   return new Promise(async (resolve)=>{
//     const a = await fetch("")
//     this.service.getCaractereByTheme(this.listeTheme[i].id).subscribe((obj)=>{
//       resolve(obj)
//     })
//     //resolve(this.service.getCaractereByTheme(this.listeTheme[i].id))
//   })
// }

// var temp = []
  // loop{
// temp.push(subFetch(i))
      // }        
      // const finalResult = await Promise.all(temp)
  