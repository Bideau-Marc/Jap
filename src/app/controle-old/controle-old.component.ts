import { Component, OnInit } from '@angular/core';
import { Controle } from '../modele/Controle';
import { ControleService } from '../API/service/services/controle/controle-service.service';
import { User } from '../modele/user';

@Component({
  selector: 'app-controle-old',
  templateUrl: './controle-old.component.html',
  styleUrls: ['./controle-old.component.css']
})
export class ControleOldComponent implements OnInit {
  listeControle:Controle[]=[]
  user:User= JSON.parse(sessionStorage.getItem('user')!)
  constructor(private controleService: ControleService) { }

  ngOnInit(): void {
    this.setControleList();
  }

  async setControleList(){
    this.listeControle = await this.controleService.getControle(this.user);
  }
}
