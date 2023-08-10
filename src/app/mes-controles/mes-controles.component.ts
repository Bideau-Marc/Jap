import { Component, OnInit } from '@angular/core';
import { Controle } from '../modele/Controle';
import { ControleService } from '../API/service/services/controle/controle-service.service';
import { User } from '../modele/User';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-mes-controles',
  templateUrl: './mes-controles.component.html',
  styleUrls: ['./mes-controles.component.css']
})
export class MesControlesComponent implements OnInit {
refaireControle(_t4: Controle) {
  this.controleService.transmettreControleARefaire(_t4);
    // Autre code pour la navigation vers le composant de contrôle ici

  
  this.router.navigateByUrl('/controle');
};
  controles: Controle[] = [];

  constructor(private router: Router, private controleService: ControleService) { }

  ngOnInit(): void {
    // Récupère l'ID de l'utilisateur (tu peux le récupérer depuis le localStorage ou autre méthode)
    const userId = 1; // Remplace par la vraie méthode pour récupérer l'ID
    const user:User=JSON.parse(sessionStorage.getItem('userLogged')!)
    // Appelle la méthode du service pour récupérer les contrôles associés à l'utilisateur
    this.controleService.getControleByUser(user).subscribe(
      (controles) => {
        this.controles = controles;
        console.log(this.controles);
        this.controles.forEach((controle:Controle)=>{
          console.log(controle.exercicesReponses);
          
          controle.exercicesReponses = JSON.parse(JSON.stringify(controle.exercicesReponses))
        })
      },
      (error) => {
        console.error('Erreur lors de la récupération des contrôles :', error);
      }
    );
    
  }
}

