import { ContentChild, NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { AuthGuardService } from './module/auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ControleComponent } from './controle/controle.component';
import { MesControlesComponent } from './mes-controles/mes-controles.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path:'register', component:UserRegisterComponent
  },
  {
    path:'mes-controles', component:MesControlesComponent, canActivate:[AuthGuardService]
  },
  { 
    path: 'login', component: LoginComponent
  },
  {
    path:"exercice", component:ExerciceComponent , canActivate: [AuthGuardService]
  },

  {
    path:"choix-exercice", component:ChoixExerciceComponent, canActivate: [AuthGuardService]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path:'controle', component:ControleComponent, canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
