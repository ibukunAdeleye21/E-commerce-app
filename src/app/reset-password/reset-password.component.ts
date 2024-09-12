import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetpasswordService } from './resetpassword.service';

@Component({
  selector: 'bot-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  private guid: string = '';
  isValidGuid: boolean = false;
  errorMessage: string | null = null;
  errorMes: string | null = null;
  newPassword: string = '';
  successMessage: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private resetpasswordSvc: ResetpasswordService) {}

  ngOnInit(): void {
    // Get GUID from query params
    this.route.queryParams.subscribe(params => {
      this.guid = params['guid'];

      // Validate the GUID by calling the backend
      if (this.guid) {
        this.validateGuid(this.guid);
      }
    })
  }

  validateGuid(guid: string): void {
    this.resetpasswordSvc.validateResetToken(guid).subscribe({
      next: () => {
        console.log("Successful validation");
        this.isValidGuid = true; // GUID is valid, show form
      },
      error: (err) => {
        console.error("Unsuccessful validation");
        this.isValidGuid = false;
        this.errorMessage = 'The reset link is invalid or expired. Please request a new one.';
      }
    });
  }

  resetPassword() {
    this.resetpasswordSvc.resetPassword(this.guid, this.newPassword).subscribe({
      next: (response: string) => {
        this.successMessage = response;
        console.log(this.successMessage);
        // Password reset successful, redirect to login
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        this.errorMes = err;
        this.errorMessage = 'Failed to reset the password. Please try again.';
      }
    });
  }
}
