import { Component } from '@angular/core';
import { IProductCart, IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { BehaviorSubject } from 'rxjs';
import { ProductdetailsService } from '../productdetails/productdetails.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: IProduct[] = [];
  filter: string = '';
  categories: string[] =["electronics", "jewelery", "men's clothing", "women's clothing", ""]; 
  productId!: number;


  constructor(
    private cartSvc: CartService, 
    private productSvc: ProductService, 
    private productDetailsSvc: ProductdetailsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    if (this.filter === '') {
      return this.products;
    }
    else {
      return this.products.filter((product) => product.category === this.filter);
    }
  }

  productDetails(product: IProduct) {
    let getProductId = product.id;
    this.productDetailsSvc.getProductDetails(getProductId);
  }

  // getProductDetails() {
  //   console.log("Hello");
  //   this.productDetailsSvc.getProductDetails(this.productId);
  // }

}
