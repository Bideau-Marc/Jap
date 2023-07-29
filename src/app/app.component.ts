import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './module/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService){

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
    this.router.navigateByUrl("/controle")
  }
}
