import { Injectable } from '@angular/core';
import { IProductCart } from '../catalog/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order, OrderCartItemDto } from './order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:7071/api';
  isUserLoggedIn: boolean = false;
  

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserStatus(isUserLoggedIn: boolean) {
    this.isUserLoggedIn = isUserLoggedIn;
  }

  urlHeader() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`)
  }

  // Method to calculate price of each product 
  calculateAmount(price: number, qty: number) {
    return price * qty;
  }

  // Get Order from backend method
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/order/get-order`, { headers: this.urlHeader()})
  }

  createOrder(cart: IProductCart[], grandTotal: number) : Observable<any> {
    console.log("Hello3");
    // if cart length is greater than 0
    if (cart.length > 0) {
      ////////////////////////////////////////////////////////////////////////////////////////

      // Empty cartItems that will be part of the orderDto
      let cartItems:  OrderCartItemDto[] = [];

      // Loop through the cart provided it is greater than 0
      cart.forEach(cart => {
        const cartItem = {
          AllProductId: cart.product.id,
          Price: cart.product.price,
          Quantity: cart.qty,
          Amount: this.calculateAmount(cart.product.price, cart.qty)
        };
        // Push the generated the cartItem to the cartItems list
        cartItems.push(cartItem);
      });

      ///////////////////////////////////////////////////////////////////////////

      // Create the orderDto which will be sent to the backend
      const orderDto = {
        cartItems: cartItems,
        TotalAmount: grandTotal
      }

      // The request to the backend
      return this.http.post(`${this.baseUrl}/order/create-order`, orderDto, { headers: this.urlHeader() })
      
    } else {
      console.log("Cart is empty");
      return new Observable<any>();
    }
    
  }

}
