import { Product } from './product.model';

// Respuesta de GET /products y GET /products/search
export interface ProductApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}