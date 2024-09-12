import { Component } from '@angular/core';
import { IUserCredentials } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  userCredentials: IUserCredentials = {Email: '', Password: ''};
  signInError: boolean = false;
  errorMessage: string = "Invalid Username or password"

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.userService.signIn(this.userCredentials).subscribe({
      next: () => {
        this.userService.isUserLoggedIn = true;
        // navigate to catalog page
        this.router.navigate(['/catalog']);
      },
      error: () => (this.signInError = true)
    })
  }
}
