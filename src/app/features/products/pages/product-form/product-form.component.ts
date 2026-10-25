import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: string[] = [];
  productId: number | null = null;
  isEdit = false;
  loading = false;
  message = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [
        null,
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)],
      ],
      category: ['', [Validators.required]],
      brand: ['', [Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    // Si la dirección trae un id (/products/5/edit) estamos editando
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.productId = Number(id);
      this.loadProduct(this.productId);
    }
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isError = true;
        this.message = 'No se pudieron cargar las categorías.';
      },
    });
  }

  // En edición se precarga el formulario con los datos del producto
  loadProduct(id: number) {
    this.loading = true;

    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          brand: product.brand || '',
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.loading = false;
        this.isError = true;
        this.message = 'No se encontró el producto.';
      },
    });
  }

  isInvalid(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return true;
    }

    const hasError = control.hasError(errorCode);
    const touched = control.touched;

    return hasError && touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.message = '';

    if (this.isEdit && this.productId) {
      this.updateProduct(this.productId);
    } else {
      this.createProduct();
    }
  }

  createProduct() {
    this.productService.createProduct(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.isError = false;
        this.message = `Producto creado. Respuesta de DummyJSON: id ${res.id}, título "${res.title}". (Es una simulación, no se guarda).`;
        this.form.reset({ category: '' });
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.loading = false;
        this.isError = true;
        this.message = 'No se pudo crear el producto.';
      },
    });
  }

  updateProduct(id: number) {
    this.productService.updateProduct(id, this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.isError = false;
        this.message = `Producto actualizado. Respuesta de DummyJSON: id ${res.id}, título "${res.title}". (Es una simulación, no se guarda).`;
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        this.loading = false;
        this.isError = true;
        this.message = 'No se pudo actualizar el producto.';
      },
    });
  }
}