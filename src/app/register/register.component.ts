import { Component } from '@angular/core';
import { IUserRegisterCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerCredentials: IUserRegisterCredentials = { firstname: '', lastname: '', phonenumber: '', email: '', password: '' };
  errorMessage: string ='';
  registerError: string = '';
  registerSuccess: string = '';
  
  constructor(private userService: UserService, private router: Router) { }

  register() {    
    this.userService.register(this.registerCredentials).subscribe({
      next: (response: string) => {
        this.registerSuccess = response;
        console.log('Registration successful', response);
        this.registerError = '';
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Registration error', error);
        this.registerError = 'Registration failed. Please try again.';
      }
    });
  }
}
