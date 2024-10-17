import { Component } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'bot-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
  }

  constructor(private changePasswordSvc: ChangePasswordService, private userSvc: UserService, private router: Router) {}

  onChangePassword() {
    console.log("Request initiated with oldPassword:", this.oldPassword, "and newPassword:", this.newPassword);

    this.changePasswordSvc.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (response: string) => {
        console.log("Request succeeded with response: ", response);
        // 200 OK response, display success message
        this.successMessage = response;
        this.errorMessage = "";
        this.userSvc.signOut();
        this.router.navigate(['sign-in']);
      },
      error: (err) => {
        // Check if error has a message
        console.log("Error occurred:", err);
        this.errorMessage = "An error occurred."
        this.successMessage = "";
      }
    })
  }
}
