import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  private qtySubject = new BehaviorSubject<number>(1);
  public productId!: number;
  private baseUrl = 'https://localhost:7071/api';

  constructor(private http: HttpClient) { }

  getProductDetails(variable: any){
    this.productId = variable;
  }

  getProduct(): Observable<any> {
    return this.http.get<IProduct>('https://localhost:7071/api/products/' + this.productId);
  }

  setQuantity(qty: number): void {
    this.qtySubject.next(qty);
  }

  getQtySubject()
  {
    return this.qtySubject.asObservable();
  }
}
