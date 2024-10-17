import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://localhost:7071/api/products');
  }

  // 
  // http://adeleyejohn-001-site1.ctempurl.com/api/products
}
