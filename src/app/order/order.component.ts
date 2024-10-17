import { Component } from '@angular/core';
import { Order } from './order.model';
import { UserService } from '../user.service';
import { OrderService } from './order.service';

@Component({
  selector: 'bot-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: Order[] = [];
  isUserLoggedIn: boolean = false;

  ngOnInit() {
    this.userService.getIsUserLoggedIn().subscribe({
      next: (user) => { this.isUserLoggedIn = user }
    });
    this.orderSvc.getUserStatus(this.isUserLoggedIn);
    // subscribe to the getOrder method in service component
    this.orderSvc.getOrder().subscribe({
      next: (response) => {
        this.orders = response.map(item => ({
          id: item.id,
          orderDate: item.orderDate,
          totalAmount: item.totalAmount,
          status: item.status,
          //Map the backend cartItems to CartItemDto structure
          cartItems: item.cartItems.map(cartItem => ({
            productId: cartItem.productId,
            productTitle: cartItem.productTitle,
            productDescription: cartItem.productDescription,
            productCategory: cartItem.productCategory,
            productImage: cartItem.productImage,
            price: cartItem.price,
            quantity: cartItem.quantity,
            amount: cartItem.amount
          }))
        }));
      },
      error: (err) => {
        console.log("Unable to load orders.");
      }
    })
  }

  constructor(private userService: UserService, private orderSvc: OrderService) {
    this.userService.getIsUserLoggedIn().subscribe({
      next: (user) => (this.isUserLoggedIn = user)
    })
  }
}
