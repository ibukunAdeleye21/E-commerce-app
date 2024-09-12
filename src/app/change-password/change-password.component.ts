import { Component } from '@angular/core';
import { ChangePasswordService } from './change-password.service';


@Component({
  selector: 'bot-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  errorMessage: string = '';

  constructor(private changePasswordSvc: ChangePasswordService) {}

  changePassword() {
    this.changePasswordSvc.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (response: string) => {
        console.log("Password Changed Successfully");
      },
      error: (error: string) => {
        console.error(error);
      }
    })
  }
}
