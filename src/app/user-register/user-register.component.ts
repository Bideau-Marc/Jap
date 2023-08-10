import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../API/service/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: LoginService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      mdp: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      admin: [false],
    });
  }

  onSubmit() {
    console.log('here', this.registerForm.valid);
    
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      this.userService.createUser(newUser).subscribe(
        () => {
          console.log('User created successfully');
          // Optionally, you can navigate to a different page
          this.router.navigateByUrl('/login')
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
    }
  }
}
