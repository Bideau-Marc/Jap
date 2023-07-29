import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Controle } from 'src/app/modele/Controle';
import { User } from 'src/app/modele/user';

@Injectable({
  providedIn: 'root'
})
export class ControleService {
  url:string = 'http://localhost:3000/controle'

  constructor(private http:HttpClient, ) { }


  async saveControle(controle:Controle){
    console.log("savign", controle.note);
    this.http.post(this.url, {controle:controle}).subscribe()
  }

  async getControle(user:User):Promise<Controle[]>{
    let listControle:Controle[] = await lastValueFrom(this.http.get<Controle[]>(this.url+'/'+user.id))
    await listControle.forEach(controle=>{
      controle.listeExercice = JSON.parse(controle.listeExercice)
      controle.listeReponse = JSON.parse(controle.listeReponse)
    })
    return listControle;
    
  }
}
