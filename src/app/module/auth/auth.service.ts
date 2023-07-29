import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    
    let authenticated = false;
    const token = localStorage.getItem('access_token');
    if(token){
      authenticated = !this.jwtHelper.isTokenExpired(token);
    }
    return authenticated;
  }

  public getToken():string|null{
    return localStorage.getItem('access_token');
  }
}
