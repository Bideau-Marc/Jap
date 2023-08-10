import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './module/auth/auth.service';
import { LoginService } from './API/service/services/login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService, private loginService: LoginService){

  }
  title = 'jap';
  goToIndex(){
    this.router.navigateByUrl("/mainPage")
  }

  goToAboutUs(){
    console.log("here");
    
    this.router.navigateByUrl("/choix-exercice")
  }

  goToProducts(){
    console.log("ici");
    
    this.router.navigateByUrl("/controle")
  }
  logout(){
    this.loginService.logout()
  }
  goToMesControles(){
    this.router.navigateByUrl('/mes-controles')
  }
}
