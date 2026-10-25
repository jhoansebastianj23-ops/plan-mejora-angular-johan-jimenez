import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductApiResponse } from '../models/product-api-response.model';
import { Product, ProductForm } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(
      `${this.API_URL}?limit=${limit}&skip=${skip}`,
    );
  }

  searchProducts(
    query: string,
    limit: number,
    skip: number,
  ): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(
      `${this.API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/category-list`);
  }

  createProduct(product: ProductForm): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/add`, product);
  }

  updateProduct(id: number, product: ProductForm): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.API_URL}/${id}`);
  }
}