import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs'
import { Theme } from 'src/app/modele/theme';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http:HttpClient ,router: Router, ) { }
  url:string='http://localhost:3000'

  public  getAllTheme():Observable<Theme[]>{    
    return this.http.get<Theme[]>(this.url+'/theme');
  }

}
