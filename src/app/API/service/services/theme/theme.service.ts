import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http:HttpClient ,router: Router, ) { }
  url:string='http://localhost:3000'

  public async getAllTheme():Promise<any>{    
    return await lastValueFrom(this.http.get(this.url+'/theme'));
  }

}
