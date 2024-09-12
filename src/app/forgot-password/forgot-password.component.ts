import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'bot-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  Email: string = '';
  successMessage: string ='';
  errorMessage: string ='';
  
  constructor(private forgotPasswordSvc: ForgotpasswordService) {}

  forgotpassword() {
    this.forgotPasswordSvc.forgotpassword(this.Email).subscribe({
      next: (response: string) => {
        this.successMessage = response;
        console.log(this.successMessage);
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.errorMessage = 'Failed to send the reselt link. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
