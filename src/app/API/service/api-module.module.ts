import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CaractereService } from './services/caractere/caractere.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    CaractereService
  ]
})
export class ApiModuleModule { }
