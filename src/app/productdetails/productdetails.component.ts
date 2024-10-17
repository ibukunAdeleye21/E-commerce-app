import { Component, OnInit } from '@angular/core';
import { IProduct,IProductCart } from '../catalog/product.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductdetailsService } from './productdetails.service';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user.service';
import { OrderService } from '../order/order.service';
import { IOrderItemDto, OrderCartItemDto } from '../order/order.model';

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
  isUserLoggedIn: boolean = false;
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
    private cartSvc: CartService, private userSvc: UserService,
    private orderSvc: OrderService
  )
  {}

  ngOnInit() {
    this.productdetailsService.getProduct().subscribe(item => this.product = item);

    this.productdetailsService.setQuantity(this.qty);
    this.userSvc.getIsUserLoggedIn().subscribe({
      next: (user) => (this.isUserLoggedIn = user)
    });
  }

  onQtyChange(newQty: number): void {
    this.productdetailsService.setQuantity(newQty);
  }

  addCart(product:IProduct)
  {
    let currentyQty = 0
    let qty = this.productdetailsService.getQtySubject().subscribe(item => {currentyQty = item});
    this.cartSvc.addFromProductDetails(product, currentyQty, this.isUserLoggedIn);
    // this.cart = {product: product, qty: this.qty }
    // console.log(this.cart);
    // this.cartSvc.addFromProductDetails(product);
  }

  calculateAmount(price: number, qty: number) {
    return price * qty;
  }

  buy(product: IProduct) {
    console.log("Hello1");

    // const cartItem : OrderCartItemDto[] = [
    //   {
    //     AllProductId : product.id,
    //     Price : product.price,
    //     Quantity : this.qty,
    //     Amount : this.calculateAmount(product.price, this.qty)
    //   }
    // ];

    const cart : IProductCart[] = [
      {
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count
          },
        },
        qty: this.qty
      }
    ]
    console.log("Hello2");

    // const orderDto = {
    //   cartItems: cartItem,
    //   TotalAmount : this.calculateAmount(product.price, this.qty)
    // }

    this.orderSvc.createOrder(cart, this.calculateAmount(product.price, this.qty))
  }
}  


