import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix-exercice',
  templateUrl: './choix-exercice.component.html',
  styleUrls: ['./choix-exercice.component.css']
})
export class ChoixExerciceComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  choixDeLexercice(){
    let value = <HTMLSelectElement>document.getElementById('selectExercice');
    let exercice = value[value.selectedIndex].textContent;
    switch(exercice){
      case "formules de politesse":
        localStorage.setItem("exo","formules");
        this.router.navigateByUrl('/exercice');
        break;
      case "katakana":
        localStorage.setItem("exo","katakana");
        this.router.navigateByUrl('/exercice');
        break;
      case "hiragana":
        localStorage.setItem("exo","hiragana");
        this.router.navigateByUrl('/exercice');
        break;
      case "premier kanji":
        localStorage.setItem("exo","premier kanji");
        this.router.navigateByUrl('/exercice');
        break;
      case "mobilier":
        localStorage.setItem("exo","mobilier");
        this.router.navigateByUrl('/exercice');
        break;
      default:
        break;
            
    }
  }
}
