import { ContentChild, NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import { ControleComponent } from './controle/controle.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ControleOldComponent } from './controle-old/controle-old.component';
import { AuthGuardService } from './module/auth/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
  path:"mainPage", component:ControleOldComponent, canActivate: [AuthGuardService]
  },
  { 
    path: 'login', component: LoginComponent
  },
  {
    path:"exercice", component:ExerciceComponent, canActivate: [AuthGuardService]
  },
  {
    path:"controle", component:ControleComponent, canActivate: [AuthGuardService]
  },
  {
    path:"choix-exercice", component:ChoixExerciceComponent, canActivate: [AuthGuardService]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
