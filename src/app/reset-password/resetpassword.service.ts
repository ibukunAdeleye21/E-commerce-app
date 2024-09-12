import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  private baseUrl = 'https://localhost:7071/api';

  constructor(private http: HttpClient) { }

  validateResetToken(guid: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/account/validate-reset-token?guid=${guid}`)
  }

  resetPassword(guid: string, newPassword: string) {
    return this.http.post(`${this.baseUrl}/account/resetpassword`, {guid, newPassword}, { responseType: 'text' });
  }
}
