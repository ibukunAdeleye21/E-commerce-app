import { Injectable } from '@angular/core';
import { IUser, IUserCredentials, IUserRegisterCredentials } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CartService } from './cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7071/api';
  private user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  showSignOutMenu: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient, private cartSvc: CartService) { }

  getUser() {
    return this.user.asObservable();
  }

  register(registerCredentials: IUserRegisterCredentials): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/account/register`, registerCredentials);
  }

  signIn(userCredentials: IUserCredentials): Observable<string> {
    return this.http
      .post<string>(`${this.baseUrl}/account/login`, userCredentials, { responseType: 'text' as 'json' })
      .pipe(
        // catchError((error: any) => {
        //   console.error('HTTP error:', error);
        //   return throwError(() => error); // Rethrow so tap can still handle it
        // }),
        tap({
          next: (token: string) => {
            try {
              localStorage.setItem('authToken', token);
              this.cartSvc.storeCartAfterLogin();
            
              this.getValidUserDetails();
            } catch (err) {
              console.error('Error storing token in localStorage:', err);
            }
          },
          error: (error) => {
            console.error('Error in tap operator:', error);
          }
        })
      );
  }

  getValidUserDetails() {
    // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          try {
            // Decode the token
            const decodedToken: any = jwtDecode(storedToken);

            // Create an IUser object with the decoded information
            const userDetails: IUser = {
              firstname: decodedToken.given_name,
              lastname: decodedToken.family_name,
              email: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
            };
            // Update the BehaviourSubject with the new user details
            this.user.next(userDetails);
          } 
          catch (error) {
            console.error('Error decoding token:', error);
          }
        }
        else {
          console.error('No token found in localStorage.')
        }
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }
  
  signOut() {
    this.user.next(null);
    this.showSignOutMenu = false;
  }
}

