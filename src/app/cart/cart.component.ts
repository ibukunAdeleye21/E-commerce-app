import { Component, OnInit } from '@angular/core';
import { IProduct, IProductCart } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { ProductdetailsService } from '../productdetails/productdetails.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: IProductCart[] = [];
  grandTotal: number = 0;
  showNotification: boolean = false;
  notificationMessage: string = '';
  isUserLoggedIn: boolean = false;

  constructor(
    private cartService: CartService, 
    private http: HttpClient,
    private productdetailsService: ProductdetailsService,
    private userSvc: UserService,
    private orderService: OrderService,
    private router: Router) { 
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart =>
      { this.cart = cart;
      this.updateGrandTotal();
    });
    this.userSvc.getIsUserLoggedIn().subscribe({
      next: (user) => (this.isUserLoggedIn = user)
    });
  }

  add(product: IProduct) {
    this.cartService.add(product, this.isUserLoggedIn);
  }

  // addFromProductDetails(product: IProduct) {
  //   this.cartService.addFromProductDetails(product);
  // }

  getTotalPriceForProduct(item: IProductCart) {
    return (
      Math.round(
        (item.qty * (item.product.price)) * 100
      ) / 100
    )
  }

  getTotalPrice() {
    return (
      Math.round(
        this.cart.reduce<number>((prev, cur) => {
          return (
            prev + cur.qty * (cur.product.price)
          );
        }, 0) * 100
      ) / 100
    )
  }

  checkOut() {
    if (this.isUserLoggedIn)
    {
      this.orderService.createOrder(this.cart, this.grandTotal).subscribe({
        next: (response) => {
          // Handle 200 Ok responses
          console.log("Order successfully created.")
          this.orderService.getOrder();
          this.router.navigate(['/order']);
        },
        // Handle 400 responses
        error: (err) => {
          console.log("Failed to create order");
        }
      })
    }
    else {
      this.notificationMessage = "You have to be logged in to purchase";
      
      this.showNotification = true;

      // Wait for 3 seconds, then hide the notification and redirect
      setTimeout(() => {
        this.showNotification = false;
        this.router.navigate(['/sign-in']);
      }, 3000);
    }
  }

  updateGrandTotal() {
    //this.cartService.add();
    this.grandTotal = this.getTotalPrice();
  }

  removeProduct(item: IProductCart) {
    this.cartService.remove(item, this.isUserLoggedIn);
    this.updateGrandTotal();
  }

  emptyCart() {
    this.cartService.empty(this.isUserLoggedIn);
    this.updateGrandTotal();
  };
}
