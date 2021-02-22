import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string = `${environment.serverAddress}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map(products => products.map( product => new Product(product)))
    );
  }
  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(
      this.url,
      product
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(
      `${this.url}/${product.id}`,
      product
    );
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.url}/${product.id}`);
  }
}
