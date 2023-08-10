import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { ChoixExerciceComponent } from './choix-exercice/choix-exercice.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthInterceptor } from './module/auth/authconfig.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslationExerciceComponent } from './translation-exercice/translation-exercice.component';
import { ControleComponent } from './controle/controle.component';
import { MesControlesComponent } from './mes-controles/mes-controles.component';
import { UserRegisterComponent } from './user-register/user-register.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ExerciceComponent,
    ChoixExerciceComponent,
    LoginComponent,
    TranslationExerciceComponent,
    ControleComponent,
    MesControlesComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    MatCardModule,
    MatFormFieldModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        allowedDomains: ["localhost"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
