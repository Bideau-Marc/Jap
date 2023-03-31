import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../API/service/services/theme/theme.service';

@Component({
  selector: 'app-choix-exercice',
  templateUrl: './choix-exercice.component.html',
  styleUrls: ['./choix-exercice.component.css']
})
export class ChoixExerciceComponent implements OnInit {
  exo:string='';
  listeOption:any[]=[];
  constructor(private router:Router,private service: ThemeService) { }

  ngOnInit(): void {
    this.service.getAllTheme().then((r:any)=>{
      this.listeOption = r;
    })
  }
  

  choixDeLexercice(){
    localStorage.setItem("exo",this.exo)
    this.router.navigateByUrl('exercice')
  }
}
