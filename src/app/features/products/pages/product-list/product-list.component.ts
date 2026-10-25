import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  form: FormGroup;
  products: Product[] = [];
  loading = false;
  message = '';
  isError = false;

  query = '';
  limit = 10;
  currentPage = 1;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit) || 1;
  }

  loadProducts() {
    this.loading = true;
    const skip = (this.currentPage - 1) * this.limit;

    // Si hay texto de búsqueda se usa /search, si no el listado normal
    const request = this.query
      ? this.productService.searchProducts(this.query, this.limit, skip)
      : this.productService.getProducts(this.limit, skip);

    request.subscribe({
      next: (data) => {
        this.products = data.products;
        this.total = data.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
        this.isError = true;
        this.message = 'No se pudieron cargar los productos.';
      },
    });
  }

  onSearch() {
    this.query = this.form.value.search.trim();
    this.currentPage = 1;
    this.message = '';
    this.loadProducts();
  }

  onClear() {
    this.form.reset({ search: '' });
    this.query = '';
    this.currentPage = 1;
    this.message = '';
    this.loadProducts();
  }

  onPrevious() {
    this.currentPage--;
    this.loadProducts();
  }

  onNext() {
    this.currentPage++;
    this.loadProducts();
  }

  onDelete(product: Product) {
    const ok = confirm(`¿Seguro que quieres eliminar "${product.title}"?`);

    if (!ok) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => {
        // DummyJSON simula la eliminación, solo la quitamos de la tabla
        this.products = this.products.filter((p) => p.id !== product.id);
        this.isError = false;
        this.message = `Producto "${res.title}" (id ${res.id}) eliminado. DummyJSON lo simula y no guarda el cambio.`;
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.isError = true;
        this.message = 'No se pudo eliminar el producto.';
      },
    });
  }
}
