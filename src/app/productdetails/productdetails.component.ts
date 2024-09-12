import { Component, OnInit } from '@angular/core';
import { IProduct,IProductCart } from '../catalog/product.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductdetailsService } from './productdetails.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'bot-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  product: IProduct = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  };
  public qty: number = 1;
  cart: IProductCart = {
    product: {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0
      }
    },
    qty: 0
  }

  constructor(private productdetailsService: ProductdetailsService,
    private cartSvc: CartService
  )
  {}

  ngOnInit() {
    // if (this.productdetailsService.productId)
    // {
    //   this.productdetailsService.getProduct().subscribe(item => this.product = item);
    // }
    // else 
    // {
    //   console.error("Product ID is not set.");
    // }
    this.productdetailsService.getProduct().subscribe(item => this.product = item);

    this.productdetailsService.setQuantity(this.qty);
  }

  onQtyChange(newQty: number): void {
    this.productdetailsService.setQuantity(newQty);
  }

  addCart(product:IProduct)
  {
    let currentyQty = 0
    let qty = this.productdetailsService.getQtySubject().subscribe(item => {currentyQty = item});
    this.cartSvc.addFromProductDetails(product, currentyQty);
    // this.cart = {product: product, qty: this.qty }
    // console.log(this.cart);
    // this.cartSvc.addFromProductDetails(product);
  }
}  


