import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  private baseUrl = 'https://localhost:7071/api';

  constructor(private http: HttpClient) { }

  forgotpassword(email: string): Observable<string> {
    return this.http
      .post(`${this.baseUrl}/account/forgotpassword`, {email}, { responseType: 'text'});
  }
}
