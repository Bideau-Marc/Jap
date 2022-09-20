import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){

  }
  title = 'jap';
  goToIndex(){
    this.router.navigateByUrl("/mainPage")
  }

  goToAboutUs(){
    this.router.navigateByUrl("/choix-exercice")
  }

  goToProducts(){
    this.router.navigateByUrl("/mainPage")
  }
}
