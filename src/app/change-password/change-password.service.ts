import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private baseUrl = 'https://localhost:7071/api';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  changePassword(oldPassword: string, newPassword: string): Observable<string> {
    const body = {
      OldPassword: oldPassword,
      NewPassword: newPassword
    };

    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    return this.http
      .post<string>(`${this.baseUrl}/account/changepassword`, body, { headers });
  }
}
