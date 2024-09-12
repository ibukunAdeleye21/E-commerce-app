import { Component, OnInit } from '@angular/core';
import { IProduct, IProductCart } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { ProductdetailsService } from '../productdetails/productdetails.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: IProductCart[] = [];
  grandTotal: number = 0;

  constructor(
    private cartService: CartService, 
    private http: HttpClient,
    private productdetailsService: ProductdetailsService,
    private userSvc: UserService,
    private router: Router) { 
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart =>
      { this.cart = cart;
      this.updateGrandTotal();
    });
  }
  
  add(product: IProduct) {
    this.cartService.add(product);
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

  order() {
    if (this.userSvc.isUserLoggedIn == true)
    {
      this.router.navigate(['/order']);
    }
    else {
      console.log("Please log in to purchase");
      this.router.navigate(['/sign-in']);
    }
  }

  updateGrandTotal() {
    //this.cartService.add();
    this.grandTotal = this.getTotalPrice();
  }

  removeProduct(item: IProductCart) {
    this.cartService.remove(item);
    this.updateGrandTotal();
  }

  emptyCart() {
    this.cartService.empty();
    this.updateGrandTotal();
  }

}
