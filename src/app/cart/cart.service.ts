import { Injectable, Injector } from '@angular/core';
import { IProduct, IProductCart } from '../catalog/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<IProductCart[]> = new BehaviorSubject<IProductCart[]>([]);
  private baseUrl = 'https://localhost:7071/api';

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) { }

  private get userSvc(): UserService {
    return this.injector.get(UserService); // Lazy injection of UserService
  }

  getCart() {
    return this.cart.asObservable();
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private headerAuth() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  

  private findLineItem(product: IProduct): IProductCart | undefined {
    const currentCart = this.cart.getValue();
    return currentCart.find((li) => li.product.id === product.id)
  }

  add(product: IProduct) {
    if (this.userSvc.isUserLoggedIn == true) {
      const token = this.getToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

      const currentCart = this.cart.getValue();
      let lineItem = this.findLineItem(product);

      if (lineItem) {
        lineItem.qty++;
      } else {
        lineItem = {product: product, qty: 1}
        currentCart.push(lineItem);
      }

      this.cart.next([...currentCart]);

      const cartItemDto = {
        AllProductId: product.id,       // product.id maps to AllProductId
        Price: product.price,           // product.price maps to Price
        Quantity: lineItem.qty          // lineItem.qty maps to Quantity
      };

      this.http.post(`${this.baseUrl}/cart/add-item`, cartItemDto, { headers }).subscribe({
        next: (response) => {
          // Handle successful response (200 OK)
          console.log('Cart item added successfully', response);
          // You can also perform any additional actions here, like showing a success message
        },
        error: (error) => {
          // Handle errors
          console.error('Failed to add item to cart', error);
          // You can also show an error message to the user
        }
      });
    }
    else {
      const currentCart = this.cart.getValue();
      let lineItem = this.findLineItem(product);

      if (lineItem) {
        lineItem.qty++;
      } else {
        lineItem = {product: product, qty: 1}
        currentCart.push(lineItem);
      }

      this.cart.next([...currentCart]);
    }
  }

  addFromProductDetails(product: IProduct, currentQty: number)
  {
    if (this.userSvc.isUserLoggedIn == true)
    {
      const token = this.getToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

      const currentCart = this.cart.getValue();
      let lineItem = this.findLineItem(product);

      if (lineItem)
      {
        lineItem.qty += currentQty;
      }
      else {
        lineItem = {product: product, qty: currentQty}
        currentCart.push(lineItem);
      }

      this.cart.next([...currentCart]);

      const cartItemDto = {
        AllProductId: product.id,       // product.id maps to AllProductId
        Price: product.price,           // product.price maps to Price
        Quantity: lineItem.qty          // lineItem.qty maps to Quantity
      };

      this.http.post(`${this.baseUrl}/cart/add-item`, cartItemDto, { headers }).subscribe({
        next: (response) => {
          // Handle successful response (200 OK)
          console.log('Cart item added successfully', response);
          // You can also perform any additional actions here, like showing a success message
        },
        error: (error) => {
          // Handle errors
          console.error('Failed to add item to cart', error);
          // You can also show an error message to the user
        }
      });
    }
    else {
      const currentCart = this.cart.getValue();
      let lineItem = this.findLineItem(product);

      if (lineItem)
      {
        lineItem.qty += currentQty;
      }
      else {
        lineItem = {product: product, qty: currentQty}
        currentCart.push(lineItem);
      }

      this.cart.next([...currentCart]);
    }
    
  }

  remove(item: IProductCart) {
    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    const currentCart = this.cart.getValue();
    const updatedCart = currentCart.filter((li) => li.product.id !== item.product.id);

    this.cart.next([...updatedCart]);

    const allProductId = item.product.id;
    this.http.delete(`${this.baseUrl}/cart/remove-product/${allProductId}`, { headers }).subscribe({
      next: () => {
        console.log('Cart removed successfully');
        
      },
      error: (error) => {
        console.error('Failed to remove cart:', error);
      }
    });
  }

  empty() {
    this.cart.next([]);

    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    this.http.delete(`${this.baseUrl}/cart/remove-all-products`, { headers }).subscribe({
      next: () => {
        console.log('All cart items removed successfully');
      },
      error: (error) => {
        console.error('Failed to remove all cart items:', error);
      }
    });
  }

  storeCartAfterLogin() {
    const token = this.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    // Make a GET request to retrieve the cart for the logged-in user
    this.http.get<any[]>(`${this.baseUrl}/cart/get-cartproductdetails`, {headers}).subscribe({
      next: (cartItemsFromBackend: any[]) => {
        // Transform the cartItemsFromBackend to match the IProductCart structure
        const cartItemsWithProductDetails: IProductCart[] = cartItemsFromBackend.map(item => {
          const product: IProduct = {
            id: item.productId,
            title: item.productTitle,
            price: item.price,
            description: item.productDescription,
            category: item.productCategory,
            image: item.productImage,
            rating: {
              rate: item.productRate,
              count: item.productCount
            }
          };
          return {
            product: product,
            qty: item.quantity
          };
        });

        // Update the BehaviourSubject with the transformed cart items
        this.cart.next(cartItemsWithProductDetails);
        console.log('Cart loaded after login:', cartItemsWithProductDetails);
      },
      error: (error) => {
        console.error('Failed to load cart after login:', error);
      }
    });
  }
}
