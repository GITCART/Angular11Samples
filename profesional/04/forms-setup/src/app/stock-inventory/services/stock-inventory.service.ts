import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Item, Product} from '../models/product.interface';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class StockInventoryService{

  constructor(private http: HttpClient) {
  }


  getCartItems(): Observable<Item[]>{
    return this.http.get<Item[]>('http://localhost:3000/cart');
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  checkBranchId(id: string) : Observable<boolean> {
    const params = new HttpParams().set('id', id);

    return this.http.get('http://localhost:3000/branches', { responseType:"json", params })

      .pipe(
        tap( res => console.log('HTTP response:', res)),
        map( (response: any[]) => !!response.length),
        catchError((error: any) => throwError(error.json()))
      )


  }
}
