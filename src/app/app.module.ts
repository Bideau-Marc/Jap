import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ControleComponent } from './controle/controle.component';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TestComponent } from './test/test.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExerciceComponent,
    ControleComponent,
    ChoixExerciceComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
