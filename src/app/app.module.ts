import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TestComponent } from './test/test.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ControleComponent } from './controle/controle.component';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TestComponent,
    ExerciceComponent,
    ControleComponent,
    ChoixExerciceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
