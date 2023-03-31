import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Caractere } from 'src/app/modele/caractere';

@Injectable({
  providedIn: 'root'
})
export class CaractereService {
  url:string = 'http://localhost:3000'
  constructor(private http:HttpClient,router: Router, ) { }

  public async getCaractereByTheme(themeId:/*Theme*/number ){
    return await  lastValueFrom(this.http.get<Caractere[]>(this.url+"/caractere/the/"+themeId));
  }


  public equals(caractere:Caractere, cara2:Caractere){
    let fr, kata,hira,kan;
    if(caractere.francais===cara2.francais){
      console.log("fr",caractere.francais,cara2.francais,caractere.francais===cara2.francais);
        fr= true;
    }
    else{
        fr=false;
    }
    if(caractere.japonaisHira===cara2.japonaisHira){
      hira=true;
      console.log("hira",caractere.japonaisHira,cara2.japonaisHira,caractere.japonaisHira===cara2.japonaisHira);
    } 
    else hira=false;
    if(caractere.japonaisKata===cara2.japonaisKata){
      kata=true;
      console.log("kata",caractere.japonaisKata,cara2.japonaisKata,caractere.japonaisKata===cara2.japonaisKata);
      
    }
    else kata=false;
    if(caractere.kanji===cara2.kanji){
      kan=true;
      console.log("kanji",caractere.kanji,cara2.kanji,caractere.kanji===cara2.kanji);
    }
    else kan = false;
    return [fr,kata,hira,kan];
}
}
