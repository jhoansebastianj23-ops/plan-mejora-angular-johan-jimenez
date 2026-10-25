// Producto como lo devuelve la API
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  rating: number;
}

// Datos que se envían desde el formulario
export interface ProductForm {
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
}