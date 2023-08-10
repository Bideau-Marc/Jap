import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/modele/User';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  createUser(newUser: User) {
    return this.http.post(this.endpoint+'/user', newUser)
  }
  getUserId(): number {
    const id:number =  (JSON.parse(sessionStorage.getItem('userLogged')!).id)
    console.log(id,"id");
    
    return id;
  } 
  endpoint = environment.endpoint
  user!:User;
  constructor(private http: HttpClient, private router: Router,) {}

  
    login(username: string, password: string): Observable<any> {
      const loginPayload = {login:username, password:password };
      return this.http.post<any>(`${this.endpoint}/auth/login`, loginPayload);
    }
  
  



  public logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}