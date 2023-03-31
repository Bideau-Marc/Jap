import { ContentChild, NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import { ControleComponent } from './controle/controle.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
  path:"mainPage", component:MainPageComponent
  },
  {
    path:"exercice", component:ExerciceComponent
  },
  {
    path:"controle", component:ControleComponent
  },
  {
    path:"choix-exercice", component:ChoixExerciceComponent
  },
  {
    path:"test", component:TestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
