import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../API/service/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private readonly fb:FormBuilder,private readonly loginService: LoginService, private router:Router) {
    this.form = this.fb.group({
      login: ['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form.value);
    
    const val = this.form.value;
    if (val.login && val.password) {
      this.loginService.login(val.login, val.password).subscribe(
        (response) => {
          // Traitez la réponse du backend ici (par exemple, rediriger vers une autre page)
          sessionStorage.setItem('userLogged', JSON.stringify(response.user))
  
          console.log('http reponseponse: ' + JSON.stringify(response, null, 4));
          localStorage.setItem('access_token',response.access_token);
          console.log("reponse",response);
          this.router.navigateByUrl('/choix-exercice')
        },
        (error) => {
          // Gérez les erreurs ici (par exemple, afficher un message d'erreur)
          console.error("error", error);
        })
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
