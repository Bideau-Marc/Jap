import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Caractere } from 'src/app/modele/Caractere';
import { Theme } from 'src/app/modele/Theme';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaractereService {
  url:string =    environment.endpoint

  constructor(private http:HttpClient) { }

  public  getCaractereByTheme(themeId:/*Theme*/number ){
    return  this.http.get<Caractere[]>(this.url+"/caractere/the/"+themeId);
  }

  // public async getFourTheme(listeTheme:number[]){
  //    let liste:any =await lastValueFrom(this.http.post(this.url+'/caractere/category',listeTheme));
  //    let cara:Caractere[]=[]
  //    await liste.forEach((element:any) => {
  //       console.log(element,"el");
  //       element.forEach((car:any) => {
  //         let c = new Caractere(car.francais, car.japonaisKata, car.japonaisHira, car.kanji)
  //         cara.push(c);
  //       });
  //     });
  //     return cara
  // }


 
}
