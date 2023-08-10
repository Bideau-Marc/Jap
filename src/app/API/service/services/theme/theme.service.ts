import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, map } from 'rxjs'
import { Theme } from 'src/app/modele/Theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  getRandomThemes(nbThemes: number): Observable<Theme[]> {
    return this.getAllTheme().pipe(
      map((themes: Theme[]) => {
        const randomThemes: Theme[] = [];
        const range = Array.from({ length: themes.length }, (_, i) => i);
        const randomNumbers = range.sort(() => Math.random() - 0.5).slice(0, nbThemes);
        randomNumbers.forEach(number => {
          randomThemes.push(themes[number]);
        });
        return randomThemes;
      })
    );
  }

  constructor(private http:HttpClient ,router: Router, ) { }
  url:string='http://localhost:3000'

  public  getAllTheme():Observable<Theme[]>{    
    return this.http.get<Theme[]>(this.url+'/theme');
  }

}
